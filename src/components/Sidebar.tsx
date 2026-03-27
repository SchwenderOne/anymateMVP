import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { FIRST_SCREEN_ASSETS } from '../constants/firstScreenAssets';
import { FIRST_SCREEN_TOKENS } from '../constants/firstScreenTokens';
import { useDevMode } from '../context/useDevMode';

const sidebarAssets = FIRST_SCREEN_ASSETS.sidebar;
const tokens = FIRST_SCREEN_TOKENS;
const DEFAULT_SIDEBAR_WIDTH = Number.parseInt(tokens.layout.sidebarWidth, 10);
const MIN_SIDEBAR_WIDTH = 300;
const MAX_SIDEBAR_WIDTH = 540;
const COLLAPSE_THRESHOLD = 180;
const COLLAPSED_WAND_LEFT = 44;
const COLLAPSED_WAND_TOP = 26;

function clampSidebarWidth(width: number) {
  return Math.min(MAX_SIDEBAR_WIDTH, Math.max(MIN_SIDEBAR_WIDTH, width));
}

function SectionLabel({ title }: { title: string }) {
  return (
    <label className="text-[13px] font-medium tracking-[-0.39px] mb-4 flex items-center text-[#c8c9ca]">
      {title}
      <div className="h-px bg-black/5 ml-3 flex-1" />
    </label>
  );
}

function CreateCharacterButton() {
  return (
    <div
      className="w-full rounded-[42px] px-8 py-[14px] flex items-center gap-4 mb-[52px] mt-2 bg-white/60 border-[3px] border-[#828282]/15 backdrop-blur-md"
      style={{ boxShadow: tokens.shadows.surface }}
    >
      <img src={sidebarAssets.createCharacterIcon} alt="Create character" className="w-[21px] h-[21px] object-contain shrink-0" />
      <h2 className="text-[#343434] text-[17.745px] font-medium tracking-[-0.177px] flex-1 text-center pr-6 leading-none">
        Create your Character
      </h2>
    </div>
  );
}

function PromptSection() {
  return (
    <div className="flex flex-col mb-[44px] w-full relative">
      <label className="text-[#c0c0c0] text-[10.706px] font-medium tracking-[-0.321px] mb-3 flex items-center">
        What do you think of?
        <div className="h-px bg-black/5 ml-3 flex-1" />
      </label>

      <div className="bg-white/65 border-[1.6px] border-black rounded-[16px] shadow-sm mb-6 relative overflow-hidden">
        <textarea
          className="w-full h-[171px] bg-transparent resize-none outline-none px-[27px] py-[28px] text-[15px] text-[#343434] placeholder:text-[#343434]/88 font-medium leading-[1.06]"
          placeholder="Write your prompt..."
        />
      </div>

      <button
        className="bg-white/65 border-[1.6px] border-black/85 rounded-[16px] px-[27px] py-[20px] flex justify-between items-center text-[15px] font-medium text-[#343434]/90 w-full"
        style={{ boxShadow: tokens.shadows.glass }}
      >
        <span className="leading-none">Pick your Artstyle</span>
        <img
          src={sidebarAssets.dropdownChevron}
          alt=""
          aria-hidden="true"
          className="w-[7px] h-[14px] rotate-90 object-contain mr-1"
        />
      </button>
    </div>
  );
}

function ReferenceUpload() {
  const uploadAssets = sidebarAssets.upload;

  return (
    <div
      className="bg-white/85 border-[3px] border-[#828282]/15 rounded-[22px] w-full h-[160px] flex flex-col items-center justify-center relative backdrop-blur-md cursor-pointer hover:bg-white transition-colors"
      style={{ boxShadow: tokens.shadows.surface }}
    >
      <div className="absolute inset-x-0 top-[-8px] flex justify-center pointer-events-none">
        <div className="relative w-[183px] h-[128px]">
          <div className="absolute left-[22px] top-0 w-[128px] h-[128px] rounded-full bg-white/80 blur-[18px]" />
          <img src={uploadAssets.dotSm} alt="" aria-hidden="true" className="absolute left-[14px] top-[6px] w-[12px] h-[12px]" />
          <img src={uploadAssets.dotMd} alt="" aria-hidden="true" className="absolute left-[9px] top-[104px] w-[16px] h-[16px]" />
          <img src={uploadAssets.dotMd} alt="" aria-hidden="true" className="absolute left-[156px] top-[88px] w-[16px] h-[16px]" />
          <img src={uploadAssets.dotXs} alt="" aria-hidden="true" className="absolute left-[144px] top-[4px] w-[10px] h-[10px]" />

          <div className="absolute left-[11px] top-[10px] w-[149.44px] h-[87px]">
            <div className="absolute left-0 top-0 w-[77.44px] h-[86.98px] flex items-center justify-center">
              <div className="relative w-[52px] h-[71.724px] -rotate-[25deg] overflow-visible">
                <img
                  src={uploadAssets.paperLeft}
                  alt=""
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 top-0 w-[93px] h-[112.724px] max-w-none"
                />
              </div>
            </div>
            <div className="absolute left-[49px] top-0 w-[52px] h-[71.724px] z-10 overflow-visible">
              <img
                src={uploadAssets.paperCenter}
                alt=""
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[93px] h-[112.724px] max-w-none"
              />
            </div>
            <div className="absolute left-[72px] top-0 w-[77.44px] h-[86.98px] flex items-center justify-center">
              <div className="relative w-[52px] h-[71.724px] rotate-[25deg] overflow-visible">
                <img
                  src={uploadAssets.paperRight}
                  alt=""
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 top-0 w-[93px] h-[112.724px] max-w-none"
                />
              </div>
            </div>
          </div>

          <div className="absolute left-[58px] top-[68px] w-[56px] h-[56px] bg-black/20 backdrop-blur-[4px] rounded-full z-20 flex items-center justify-center">
            <img src={uploadAssets.cloud} alt="Upload" className="w-[33px] h-[25px] object-contain" />
          </div>
        </div>
      </div>

      <p className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[260px] text-center text-[14px] text-[#343434]/62 font-medium tracking-[-0.42px] leading-none">
        Drag and drop media below 15MB
      </p>
    </div>
  );
}

function FinishSection({ opacity }: { opacity: number }) {
  return (
    <div className="mt-8">
      <SectionLabel title="Finish" />
      <div className="flex justify-center w-full pt-2">
        <button className="relative w-[181px] h-[70px] flex items-center justify-center" style={{ opacity }}>
          <img
            src={sidebarAssets.generatePill}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <span className="relative text-white text-[30px] font-medium tracking-[-0.3px] leading-none">
            Generate
          </span>
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { tokens: devTokens } = useDevMode();
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef<{ startX: number; startWidth: number; moved: boolean } | null>(null);
  const expandedWidthRef = useRef(DEFAULT_SIDEBAR_WIDTH);
  const sidebarWidthRef = useRef(DEFAULT_SIDEBAR_WIDTH);
  const isCollapsedRef = useRef(false);

  const collapseSidebar = useCallback(() => {
    if (sidebarWidth > COLLAPSE_THRESHOLD) {
      expandedWidthRef.current = clampSidebarWidth(sidebarWidth);
    }
    isCollapsedRef.current = true;
    sidebarWidthRef.current = 0;
    setIsCollapsed(true);
    setSidebarWidth(0);
  }, [sidebarWidth]);

  const expandSidebar = useCallback((nextWidth = expandedWidthRef.current) => {
    const resolvedWidth = clampSidebarWidth(nextWidth);
    expandedWidthRef.current = resolvedWidth;
    isCollapsedRef.current = false;
    sidebarWidthRef.current = resolvedWidth;
    setIsCollapsed(false);
    setSidebarWidth(resolvedWidth);
  }, []);

  const finalizeSidebarWidth = useCallback((nextWidth: number) => {
    if (nextWidth <= COLLAPSE_THRESHOLD) {
      collapseSidebar();
      return;
    }

    const resolvedWidth = clampSidebarWidth(nextWidth);
    expandedWidthRef.current = resolvedWidth;
    isCollapsedRef.current = false;
    sidebarWidthRef.current = resolvedWidth;
    setIsCollapsed(false);
    setSidebarWidth(resolvedWidth);
  }, [collapseSidebar]);

  const resetSidebarWidth = useCallback(() => {
    expandSidebar(DEFAULT_SIDEBAR_WIDTH);
  }, [expandSidebar]);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      const deltaX = event.clientX - dragState.startX;
      if (Math.abs(deltaX) > 3) {
        dragState.moved = true;
      }

      const nextWidth = dragState.startWidth + deltaX;
      if (nextWidth <= COLLAPSE_THRESHOLD) {
        isCollapsedRef.current = true;
        sidebarWidthRef.current = 0;
        setIsCollapsed(true);
        setSidebarWidth(0);
        return;
      }

      const resolvedWidth = clampSidebarWidth(nextWidth);
      expandedWidthRef.current = resolvedWidth;
      isCollapsedRef.current = false;
      sidebarWidthRef.current = resolvedWidth;
      setIsCollapsed(false);
      setSidebarWidth(resolvedWidth);
    }

    function handlePointerUp() {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      dragStateRef.current = null;
      setIsDragging(false);

      if (!dragState.moved) {
        if (isCollapsedRef.current) {
          expandSidebar();
        } else {
          collapseSidebar();
        }
        return;
      }

      finalizeSidebarWidth(sidebarWidthRef.current);
    }

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [collapseSidebar, expandSidebar, finalizeSidebarWidth]);

  function handleResizePointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;

    event.preventDefault();
    dragStateRef.current = {
      startX: event.clientX,
      startWidth: isCollapsed ? expandedWidthRef.current : sidebarWidth,
      moved: false,
    };
    setIsDragging(true);
  }

  return (
    <div
      className="relative h-full flex-shrink-0 overflow-visible transition-[width,margin-right] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        width: `${sidebarWidth}px`,
        marginRight: isCollapsed ? '0px' : '-2px',
        transitionDuration: isDragging ? '0ms' : '250ms',
      }}
    >
      <aside
        className="absolute inset-0 h-full rounded-tr-[12px] border-[2px] transition-[opacity,transform] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          backgroundColor: devTokens.sidebarSurface,
          backdropFilter: `blur(${tokens.blur.sidebar})`,
          borderColor: tokens.colors.whiteBorder,
          opacity: isCollapsed ? 0 : 1,
          transform: isCollapsed ? 'translateX(-18px) scaleX(0.94)' : 'translateX(0) scaleX(1)',
          pointerEvents: isCollapsed ? 'none' : 'auto',
          transitionDuration: isDragging ? '0ms' : '250ms',
        }}
      >
        <div className="relative z-10 flex h-full flex-col overflow-y-auto px-6 pb-12 pt-4 no-scrollbar">
          <CreateCharacterButton />
          <PromptSection />

          <div className="relative mb-auto flex w-full flex-col">
            <SectionLabel title="Reference" />
            <ReferenceUpload />
          </div>

          <FinishSection opacity={devTokens.generateButtonOpacity} />
        </div>
      </aside>

      <button
        type="button"
        onPointerDown={handleResizePointerDown}
        onDoubleClick={resetSidebarWidth}
        className="absolute top-1/2 z-[100] h-[45px] w-[24px] -translate-y-1/2 cursor-ew-resize transition-all duration-200 hover:brightness-95"
        style={{
          right: '-12px',
          opacity: isCollapsed ? 0 : 1,
          transform: `translateY(-50%) scale(${isDragging ? 1.04 : 1})`,
          pointerEvents: isCollapsed ? 'none' : 'auto',
        }}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Resize or collapse sidebar'}
      >
        <img src={sidebarAssets.sidebarHandle} alt="" aria-hidden="true" className="h-full w-full object-contain" />
      </button>

      <button
        type="button"
        onClick={() => expandSidebar()}
        className="absolute z-[110] flex h-[44px] w-[44px] items-center justify-center rounded-full shadow-sm transition-[opacity,transform] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          left: `${COLLAPSED_WAND_LEFT}px`,
          top: `${COLLAPSED_WAND_TOP}px`,
          backgroundColor: tokens.colors.glassSurface,
          border: `1.8px solid ${tokens.colors.controlBorder}`,
          backdropFilter: `blur(${tokens.blur.glass})`,
          opacity: isCollapsed ? 1 : 0,
          transform: isCollapsed ? 'scale(1) translateX(0)' : 'scale(0.8) translateX(-12px)',
          pointerEvents: isCollapsed ? 'auto' : 'none',
        }}
        aria-label="Expand sidebar"
      >
        <img src={sidebarAssets.createCharacterIcon} alt="" aria-hidden="true" className="h-[18px] w-[18px] object-contain" />
      </button>
    </div>
  );
}
