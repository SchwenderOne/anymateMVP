import { FIRST_SCREEN_ASSETS } from '../constants/firstScreenAssets';
import { FIRST_SCREEN_TOKENS } from '../constants/firstScreenTokens';

const sidebarAssets = FIRST_SCREEN_ASSETS.sidebar;
const tokens = FIRST_SCREEN_TOKENS;

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

function FinishSection() {
  return (
    <div className="mt-8">
      <SectionLabel title="Finish" />
      <div className="flex justify-center w-full pt-2">
        <button className="relative w-[181px] h-[70px] flex items-center justify-center">
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
  return (
    <aside
      className="h-full flex flex-col flex-shrink-0 pt-4 px-6 pb-12 overflow-y-auto no-scrollbar relative z-30"
      style={{ width: tokens.layout.sidebarWidth }}
    >
      <div
        className="absolute inset-y-0 left-0 -right-3 rounded-tr-[12px] border-r border-[#dcdcdc]/35 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col h-full">
        <CreateCharacterButton />
        <PromptSection />

        <div className="flex flex-col mb-auto w-full relative">
          <SectionLabel title="Reference" />
          <ReferenceUpload />
        </div>

        <FinishSection />
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-[-12px] w-[24px] h-[45px] cursor-pointer z-[100] hover:brightness-95 transition-all">
        <img src={sidebarAssets.sidebarHandle} alt="Toggle Sidebar" className="w-full h-full object-contain" />
      </div>
    </aside>
  );
}
