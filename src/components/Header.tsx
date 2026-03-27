import { Undo2, Redo2 } from 'lucide-react';
import { FIRST_SCREEN_ASSETS } from '../constants/firstScreenAssets';
import { FIRST_SCREEN_TOKENS } from '../constants/firstScreenTokens';
import { useDevMode } from '../context/useDevMode';

const headerAssets = FIRST_SCREEN_ASSETS.header;
const tokens = FIRST_SCREEN_TOKENS;

function BrandBlock() {
  return (
    <div className="flex items-center gap-[15px] w-[300px]">
      <img
        src={headerAssets.logo}
        alt="Caesar Logo"
        className="w-[23px] h-[34px] object-contain shrink-0"
      />
      <h1 className="text-[21.326px] font-medium tracking-[-0.213px] text-[#4d4d4d] leading-none">
        Caesar 1
      </h1>
    </div>
  );
}

function StepNavigation() {
  const steps = ['Start', 'Step 1', 'Step 3', 'Finish'] as const;

  return (
    <nav className="flex items-center gap-[19px] text-[16px] font-medium flex-1 justify-center">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-[19px]">
          <span className={index === steps.length - 1 ? 'text-black' : index === 0 ? 'text-[#4d4d4d]' : 'text-black/76'}>
            {step}
          </span>
          {index < steps.length - 1 ? (
            <img
              src={headerAssets.breadcrumbChevron}
              alt=""
              aria-hidden="true"
              className="w-[6px] h-[11px] object-contain shrink-0"
            />
          ) : null}
        </div>
      ))}

      <div className="w-px h-[21px] bg-[#c6c6c6] ml-1 mr-2.5" />

      <button className="p-1.5 text-[#999] hover:text-black transition-colors">
        <Undo2 className="w-[24px] h-[24px]" strokeWidth={2.5} />
      </button>
      <button className="p-1.5 text-[#999] hover:text-black transition-colors">
        <Redo2 className="w-[24px] h-[24px]" strokeWidth={2.5} />
      </button>
    </nav>
  );
}

type RoundIconButtonProps = {
  src: string;
  alt: string;
  iconClassName: string;
  onClick?: () => void;
};

function RoundIconButton({ src, alt, iconClassName, onClick }: RoundIconButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-[34px] h-[34px] rounded-full bg-white/25 border border-[#828282]/15 flex items-center justify-center transition-colors hover:bg-white/45"
      style={{ boxShadow: tokens.shadows.glass }}
    >
      <img src={src} alt={alt} className={iconClassName} />
    </button>
  );
}

function HeaderActions() {
  return (
    <div className="flex items-center justify-end gap-[15px] w-[300px]">
      <button className="relative w-[86px] h-[49px] flex items-center justify-center">
        <img src={headerAssets.savePill} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-contain" />
        <span className="relative text-white text-[18.987px] font-medium tracking-[-0.19px] leading-none">
          Save
        </span>
      </button>
      <RoundIconButton src={headerAssets.playIcon} alt="Play" iconClassName="w-[15px] h-[15px] object-contain ml-0.5" />
      <RoundIconButton src={headerAssets.settingsIcon} alt="Settings" iconClassName="w-[20px] h-[19px] object-contain" />
    </div>
  );
}

type HeaderProps = {
  onSettingsClick?: () => void;
};

function HeaderActionsWithSettings({ onSettingsClick }: HeaderProps) {
  return (
    <div className="flex items-center justify-end gap-[15px] w-[300px]">
      <button className="relative w-[86px] h-[49px] flex items-center justify-center">
        <img src={headerAssets.savePill} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-contain" />
        <span className="relative text-white text-[18.987px] font-medium tracking-[-0.19px] leading-none">
          Save
        </span>
      </button>
      <RoundIconButton src={headerAssets.playIcon} alt="Play" iconClassName="w-[15px] h-[15px] object-contain ml-0.5" />
      <RoundIconButton src={headerAssets.settingsIcon} alt="Settings" iconClassName="w-[20px] h-[19px] object-contain" onClick={onSettingsClick} />
    </div>
  );
}

export function Header({ onSettingsClick }: HeaderProps) {
  const { tokens: devTokens } = useDevMode();

  return (
    <header
      className="flex items-center justify-between px-[32px] lg:px-[52px] w-full flex-shrink-0 z-10 relative"
      style={{ height: tokens.layout.headerHeight, backgroundColor: devTokens.headerSurface }}
    >
      <BrandBlock />
      <StepNavigation />
      {onSettingsClick ? <HeaderActionsWithSettings onSettingsClick={onSettingsClick} /> : <HeaderActions />}
    </header>
  );
}
