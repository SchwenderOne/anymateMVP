import { useContext } from 'react';
import { DevModeContext } from './devModeContextValue';

export function useDevMode() {
  const ctx = useContext(DevModeContext);
  if (!ctx) throw new Error('useDevMode must be used within DevModeProvider');
  return ctx;
}
