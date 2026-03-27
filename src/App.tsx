import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CanvasArea } from './components/CanvasArea';
import { DevPanel } from './components/DevPanel';
import { SettingsScreen } from './components/SettingsScreen';
import { useDevMode } from './context/useDevMode';
import { DevModeProvider } from './context/DevModeContext';
import { useState } from 'react';

type AppScreen = 'main' | 'settings';

function AppContent() {
  const { tokens } = useDevMode();
  const [screen, setScreen] = useState<AppScreen>('main');

  return (
    <div
      className="w-screen h-screen flex flex-col overflow-hidden text-[#343434] font-aeonik relative"
      style={{ backgroundImage: tokens.gradient, color: '#343434' }}
    >
      {/* Full-screen semi-transparent overlay over the gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundColor: tokens.overlaySurface,
          backdropFilter: `blur(${tokens.overlayBlur})`,
        }}
      />

      {screen === 'settings' ? (
        <div className="relative z-[1]">
          <SettingsScreen onExit={() => setScreen('main')} />
        </div>
      ) : (
        <>
          <Header onSettingsClick={() => setScreen('settings')} />
          <div className="flex-1 flex flex-row overflow-hidden w-full h-full relative z-[1]">
            <Sidebar />
            <CanvasArea />
          </div>
        </>
      )}

      <DevPanel />
    </div>
  );
}

function App() {
  return (
    <DevModeProvider>
      <AppContent />
    </DevModeProvider>
  );
}

export default App;
