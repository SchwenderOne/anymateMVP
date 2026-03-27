import { createContext } from 'react';
import type { DesignOverrides, ResolvedDevTokens } from './DevModeContext';

export interface DevModeContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  overrides: DesignOverrides;
  setOverride: <K extends keyof DesignOverrides>(key: K, value: DesignOverrides[K]) => void;
  resetDefaults: () => void;
  tokens: ResolvedDevTokens;
  savedGradients: string[];
  addSavedGradient: (gradient: string) => void;
  updateSavedGradient: (previousGradient: string, nextGradient: string) => void;
  removeSavedGradient: (gradient: string) => void;
}

export const DevModeContext = createContext<DevModeContextValue | null>(null);
