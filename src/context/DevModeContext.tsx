import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { FIRST_SCREEN_TOKENS } from '../constants/firstScreenTokens';

/* ── Editable design overrides ─────────────────────────────── */

export interface DesignOverrides {
  /** Header transparency 0-100 (%) */
  headerTransparency: number;
  /** Sidebar transparency 0-100 (%) */
  sidebarTransparency: number;
  /** Generate button transparency 0-100 (%) */
  generateButtonTransparency: number;
  /** Full-screen overlay transparency 0-100 (%) */
  overlayTransparency: number;
  /** Canvas area transparency 0-100 (%) */
  canvasTransparency: number;
  /** Overlay blur 0–100 (px) */
  overlayBlur: number;
  /** Raw CSS gradient string */
  gradient: string;
}

const DEFAULTS: DesignOverrides = {
  headerTransparency: 8,
  sidebarTransparency: 15,
  generateButtonTransparency: 25,
  overlayTransparency: 15,
  canvasTransparency: 10,
  overlayBlur: 60.313,
  gradient: FIRST_SCREEN_TOKENS.gradients.warmBackground,
};

const STORAGE_KEY = 'anymate-dev-overrides';
const GRADIENT_STORAGE_KEY = 'anymate-dev-gradients';

/* ── Helpers ───────────────────────────────────────────────── */

function loadOverrides(): DesignOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch { /* ignore bad data */ }
  return { ...DEFAULTS };
}

function saveOverrides(o: DesignOverrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(o));
}

function loadSavedGradients(): string[] {
  const defaults = [FIRST_SCREEN_TOKENS.gradients.warmBackground];

  try {
    const raw = localStorage.getItem(GRADIENT_STORAGE_KEY);
    if (!raw) return defaults;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaults;

    const gradients = parsed
      .filter((value): value is string => typeof value === 'string')
      .map((value) => value.trim())
      .filter(Boolean);

    return gradients.length > 0 ? Array.from(new Set([...defaults, ...gradients])) : defaults;
  } catch {
    return defaults;
  }
}

function saveSavedGradients(gradients: string[]) {
  localStorage.setItem(GRADIENT_STORAGE_KEY, JSON.stringify(gradients));
}

/** Convert a transparency % (0-50) to an rgba surface string */
function toSurface(base: [number, number, number], transparencyPct: number): string {
  const opacity = 1 - transparencyPct / 100;
  return `rgba(${base[0]}, ${base[1]}, ${base[2]}, ${opacity.toFixed(2)})`;
}

/* ── Resolved tokens (what components consume) ─────────────── */

export interface ResolvedDevTokens {
  headerSurface: string;
  sidebarSurface: string;
  generateButtonOpacity: number;
  overlaySurface: string;
  canvasSurface: string;
  overlayBlur: string;
  gradient: string;
}

function resolveTokens(o: DesignOverrides): ResolvedDevTokens {
  return {
    headerSurface: toSurface([240, 240, 240], o.headerTransparency),
    sidebarSurface: toSurface([248, 248, 248], o.sidebarTransparency),
    generateButtonOpacity: Number((1 - o.generateButtonTransparency / 100).toFixed(2)),
    overlaySurface: toSurface([248, 248, 248], o.overlayTransparency),
    canvasSurface: toSurface([248, 248, 248], o.canvasTransparency),
    overlayBlur: `${o.overlayBlur}px`,
    gradient: o.gradient,
  };
}

import { DevModeContext } from './devModeContextValue';

/* ── Provider ──────────────────────────────────────────────── */

export function DevModeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [overrides, setOverrides] = useState<DesignOverrides>(loadOverrides);
  const [savedGradients, setSavedGradients] = useState<string[]>(loadSavedGradients);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  const setOverride = useCallback(<K extends keyof DesignOverrides>(key: K, value: DesignOverrides[K]) => {
    setOverrides(prev => {
      const next = { ...prev, [key]: value };
      saveOverrides(next);
      return next;
    });
  }, []);

  const resetDefaults = useCallback(() => {
    setOverrides({ ...DEFAULTS });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const addSavedGradient = useCallback((gradient: string) => {
    const normalizedGradient = gradient.trim();
    if (!normalizedGradient) return;

    setSavedGradients((prev) => {
      if (prev.includes(normalizedGradient)) return prev;

      const next = [...prev, normalizedGradient];
      saveSavedGradients(next);
      return next;
    });
  }, []);

  const updateSavedGradient = useCallback((previousGradient: string, nextGradientValue: string) => {
    const normalizedNextGradient = nextGradientValue.trim();
    if (!previousGradient || !normalizedNextGradient) return;

    setSavedGradients((prev) => {
      const gradientIndex = prev.indexOf(previousGradient);
      if (gradientIndex === -1) return prev;

      const deduped = prev.filter((gradient, index) => index === gradientIndex || gradient !== normalizedNextGradient);
      const next = [...deduped];
      next[gradientIndex] = normalizedNextGradient;
      saveSavedGradients(next);
      return next;
    });

    setOverrides((prev) => {
      if (prev.gradient !== previousGradient) return prev;

      const next = { ...prev, gradient: normalizedNextGradient };
      saveOverrides(next);
      return next;
    });
  }, []);

  const removeSavedGradient = useCallback((gradientToRemove: string) => {
    if (!gradientToRemove) return;

    setSavedGradients((prev) => {
      const next = prev.filter((gradient) => gradient !== gradientToRemove);
      if (next.length === prev.length || next.length === 0) return prev;

      saveSavedGradients(next);
      return next;
    });
  }, []);

  // ⌘D keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.metaKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape') {
        close();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle, close]);

  const tokens = resolveTokens(overrides);

  return (
    <DevModeContext.Provider
      value={{
        isOpen,
        toggle,
        close,
        overrides,
        setOverride,
        resetDefaults,
        tokens,
        savedGradients,
        addSavedGradient,
        updateSavedGradient,
        removeSavedGradient,
      }}
    >
      {children}
    </DevModeContext.Provider>
  );
}
