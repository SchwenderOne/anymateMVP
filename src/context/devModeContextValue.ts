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
}

export const DevModeContext = createContext<DevModeContextValue | null>(null);
