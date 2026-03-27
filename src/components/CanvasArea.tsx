import { Info } from 'lucide-react';
import { FIRST_SCREEN_ASSETS } from '../constants/firstScreenAssets';
import { FIRST_SCREEN_TOKENS } from '../constants/firstScreenTokens';
import { useDevMode } from '../context/useDevMode';

const canvasAssets = FIRST_SCREEN_ASSETS.canvas;
const tokens = FIRST_SCREEN_TOKENS;

function CanvasToolbar() {
  return (
    <div
      className="absolute top-4 left-1/2 -translate-x-1/2 rounded-[28px] h-[44px] flex items-center px-[29px] gap-[22px] shadow-sm z-10 border"
      style={{
        backgroundColor: tokens.colors.glassSurface,
        borderColor: tokens.colors.controlBorder,
        backdropFilter: `blur(${tokens.blur.glass})`,
      }}
    >
      <span className="text-[#226ab3] text-[20px] font-medium tracking-[-0.2px] leading-none">
        360°
      </span>
      <img src={canvasAssets.gridIcon} alt="Grid" className="w-[22px] h-[22px] object-contain" />
      <img src={canvasAssets.shieldIcon} alt="Shield" className="w-[25px] h-[31px] object-contain" />
    </div>
  );
}

function EditControl() {
  return (
    <button
      className="absolute top-4 right-4 rounded-[28px] h-[44px] flex items-center px-5 gap-[10px] shadow-sm z-10 transition-colors"
      style={{
        backgroundColor: tokens.colors.glassSurface,
        border: `1.8px solid ${tokens.colors.controlBorder}`,
        backdropFilter: `blur(${tokens.blur.glass})`,
      }}
    >
      <img src={canvasAssets.editIcon} alt="Edit" className="w-[21px] h-[21px] object-contain" />
      <span className="text-[#343434] font-medium text-[17.91px] tracking-[-0.179px] leading-none">
        Edit
      </span>
    </button>
  );
}

function ZoomControl() {
  return (
    <div
      className="absolute bottom-6 right-16 rounded-[28px] h-[44px] w-[315px] flex items-center justify-between px-5 shadow-sm z-10"
      style={{
        backgroundColor: tokens.colors.glassSurface,
        border: `1.8px solid ${tokens.colors.controlBorder}`,
        backdropFilter: `blur(${tokens.blur.glass})`,
      }}
    >
      <button className="w-[20px] h-[20px] flex items-center justify-center">
        <img src={canvasAssets.zoomMinus} className="w-[20px] h-[20px] object-contain" alt="Zoom out" />
      </button>

      <div className="flex-1 mx-4 h-[6px] bg-black/10 rounded-full relative overflow-visible">
        <div className="absolute top-0 left-0 h-full bg-[#1985cc] rounded-full w-[25%]" />
        <div className="absolute top-1/2 -translate-y-1/2 left-[25%] -ml-2 w-[16px] h-[16px] bg-white border border-[#1985cc] rounded-full shadow-[0_2.788px_4.181px_-1px_rgba(10,13,18,0.1),0_1.394px_2.788px_-2px_rgba(10,13,18,0.06)]" />
      </div>

      <button className="w-[20px] h-[20px] flex items-center justify-center">
        <img src={canvasAssets.zoomPlus} className="w-[20px] h-[20px] object-contain" alt="Zoom in" />
      </button>
    </div>
  );
}

export function CanvasArea() {
  const { tokens: devTokens } = useDevMode();

  return (
    <main
      className="flex-1 flex flex-col relative rounded-tl-[12px] rounded-bl-[12px] overflow-hidden shadow-sm"
      style={{
        border: `2px solid ${tokens.colors.whiteBorder}`,
        backgroundColor: devTokens.canvasSurface,
      }}
    >
      
      {/* Background Dots Grid */}
      <div 
        className="absolute inset-0 z-0 bg-transparent flex items-center justify-center opacity-60 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #cecece 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          backgroundPosition: 'center',
        }}
      />

      <CanvasToolbar />
      <EditControl />
      <ZoomControl />

      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none px-10">
        <img
          src={canvasAssets.characterShaman}
          alt="Shaman character"
          className="w-full max-w-[420px] h-auto object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,0.16)]"
        />
      </div>

      {/* Bottom Right Info Button */}
      <div
        className="absolute bottom-6 right-4 rounded-full w-[44px] h-[44px] flex items-center justify-center shadow-sm z-10 transition-colors cursor-pointer"
        style={{
          backgroundColor: tokens.colors.glassSurface,
          border: `1.8px solid ${tokens.colors.controlBorder}`,
          backdropFilter: `blur(${tokens.blur.glass})`,
        }}
      >
         <Info className="w-5 h-5 text-[#343434]" />
      </div>

      {/* Center Drag lines visual */}
      <div className="absolute left-[30px] top-1/2 -translate-y-1/2 w-[7px] h-[158px] bg-[#c4c4c4] border-[1.6px] border-[#555] rounded-full backdrop-blur-sm opacity-50 block xl:hidden" />

    </main>
  );
}
