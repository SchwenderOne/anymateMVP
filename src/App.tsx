import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CanvasArea } from './components/CanvasArea';
import { DevPanel } from './components/DevPanel';
import { useDevMode } from './context/useDevMode';
import { DevModeProvider } from './context/DevModeContext';

function AppContent() {
  const { tokens } = useDevMode();

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

      <Header />
      <div className="flex-1 flex flex-row overflow-hidden w-full h-full relative z-[1]">
        <Sidebar />
        <CanvasArea />
      </div>

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
