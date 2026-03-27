import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { FIRST_SCREEN_TOKENS } from '../constants/firstScreenTokens';

/* ── Editable design overrides ─────────────────────────────── */

export interface DesignOverrides {
  /** Header transparency 0–50 (%) */
  headerTransparency: number;
  /** Full-screen overlay transparency 0–50 (%) */
  overlayTransparency: number;
  /** Canvas area transparency 0–50 (%) */
  canvasTransparency: number;
  /** Overlay blur 0–100 (px) */
  overlayBlur: number;
  /** Raw CSS gradient string */
  gradient: string;
}

const DEFAULTS: DesignOverrides = {
  headerTransparency: 8,
  overlayTransparency: 15,
  canvasTransparency: 10,
  overlayBlur: 60.313,
  gradient: FIRST_SCREEN_TOKENS.gradients.warmBackground,
};

const STORAGE_KEY = 'anymate-dev-overrides';

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

/** Convert a transparency % (0-50) to an rgba surface string */
function toSurface(base: [number, number, number], transparencyPct: number): string {
  const opacity = 1 - transparencyPct / 100;
  return `rgba(${base[0]}, ${base[1]}, ${base[2]}, ${opacity.toFixed(2)})`;
}

/* ── Resolved tokens (what components consume) ─────────────── */

export interface ResolvedDevTokens {
  headerSurface: string;
  overlaySurface: string;
  canvasSurface: string;
  overlayBlur: string;
  gradient: string;
}

function resolveTokens(o: DesignOverrides): ResolvedDevTokens {
  return {
    headerSurface: toSurface([240, 240, 240], o.headerTransparency),
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
    <DevModeContext.Provider value={{ isOpen, toggle, close, overrides, setOverride, resetDefaults, tokens }}>
      {children}
    </DevModeContext.Provider>
  );
}
