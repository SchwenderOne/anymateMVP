import { useState } from 'react';
import {
  BadgeCheck,
  BriefcaseBusiness,
  ChevronRight,
  ClipboardList,
  Home,
  Import,
  Info,
  Mail,
  Plus,
  Rocket,
  Shield,
  Sparkles,
  UserRound,
  Users,
  WandSparkles,
} from 'lucide-react';
import { FIRST_SCREEN_ASSETS } from '../constants/firstScreenAssets';
import { FIRST_SCREEN_TOKENS } from '../constants/firstScreenTokens';
import { SETTINGS_SCREEN_ASSETS } from '../constants/settingsScreenAssets';

const tokens = FIRST_SCREEN_TOKENS;
const headerAssets = FIRST_SCREEN_ASSETS.header;

const settingsTabs = [
  'Profile',
  'Password',
  'People',
  'Plan',
  'Compliance',
  'Preferences',
  'Notifications',
  'Integrations',
  'API and Dev',
] as const;

type SettingsNavItemConfig = {
  label: string;
  icon: typeof Home;
  action?: 'home';
};

const sideNavItems: SettingsNavItemConfig[] = [
  { label: 'Home', icon: Home, action: 'home' as const },
  { label: 'My work', icon: BriefcaseBusiness },
  { label: 'Create', icon: WandSparkles },
  { label: 'Brand Hub', icon: Sparkles },
  { label: 'Campaigns', icon: Rocket },
  { label: 'Leads', icon: ClipboardList },
  { label: 'Research', icon: BadgeCheck },
  { label: 'Security', icon: Shield },
  { label: 'Team', icon: Users },
] as const;

function TopActionPill({
  icon: Icon,
  label,
  variant = 'filled',
}: {
  icon: typeof Plus;
  label: string;
  variant?: 'filled' | 'light';
}) {
  const filled = variant === 'filled';

  return (
    <button
      className="h-[44px] rounded-[31.9px] flex items-center gap-2.5 px-4 transition-colors"
      style={{
        backgroundColor: filled ? '#c58c22' : '#ffffff',
        border: filled ? '2px solid rgba(255,255,255,0.56)' : '2px solid #e7e7e7',
        boxShadow: filled ? undefined : tokens.shadows.glass,
      }}
    >
      <Icon className={`w-[18px] h-[18px] ${filled ? 'text-white' : 'text-[#414a38]'}`} strokeWidth={2.2} />
      <span className={`text-[17.928px] font-medium tracking-[-0.36px] ${filled ? 'text-white' : 'text-[#414a38]'}`}>
        {label}
      </span>
    </button>
  );
}

function SettingsNavItem({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: typeof Home;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full h-[42px] rounded-[30.584px] flex items-center gap-[10px] px-[12.655px] text-left hover:bg-white/45 transition-colors"
    >
      <Icon className="w-[20px] h-[20px] text-[#7ca8bd]" strokeWidth={2.1} />
      <span className="flex-1 text-[#3d3d3d] text-[17.928px] font-medium tracking-[-0.3586px]">
        {label}
      </span>
      {label !== 'Home' ? <ChevronRight className="w-[12px] h-[12px] text-[#8d8d8d]" strokeWidth={2.2} /> : null}
    </button>
  );
}

function FieldLabel({
  title,
  description,
  required = false,
}: {
  title: string;
  description?: string;
  required?: boolean;
}) {
  return (
    <div className="w-[270px] shrink-0 flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <span className="text-[#414651] text-[17.887px] font-bold">{title}</span>
        {required ? <span className="text-[#7f56d9] text-[17.887px] font-semibold">*</span> : null}
      </div>
      {description ? (
        <p className="text-[#535862] text-[17.887px] leading-[25.553px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function InputShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`h-[57px] rounded-[34px] bg-white border border-[#d5d7da] shadow-[0_1.278px_2.555px_0_rgba(10,13,18,0.05)] flex items-center ${className}`}
    >
      {children}
    </div>
  );
}

export function SettingsScreen({ onExit }: { onExit: () => void }) {
  const [showJobTitle, setShowJobTitle] = useState(true);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#f0f0f0] text-[#343434] font-aeonik relative">
      <div className="absolute inset-0 bg-[#f0f0f0]" />

      <div className="absolute top-[14px] left-[16px] flex items-center gap-[10px] z-20">
        <button
          onClick={onExit}
          className="w-[36px] h-[36px] rounded-full bg-[#c58c22] border border-white/60 flex items-center justify-center"
        >
          <WandSparkles className="w-[18px] h-[18px] text-white" strokeWidth={2.2} />
        </button>
        <TopActionPill icon={Plus} label="Create a form" />
        <TopActionPill icon={Import} label="Import a form" variant="light" />
      </div>

      <div className="absolute top-[14px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        <div className="w-[15px] h-[28px] relative">
          <div className="absolute left-0 top-0 w-[10px] h-[28px] rounded-[7px] bg-[#2b2b2b]" />
          <div className="absolute right-0 top-[9px] w-[11px] h-[11px] rounded-full bg-[#4b4b4b]" />
        </div>
        <span className="text-[#2b2b2b] text-[23px] font-semibold tracking-[-0.8px]">portico</span>
      </div>

      <div className="absolute top-[14px] right-[16px] z-20 flex items-center gap-[10px]">
        <button className="w-[52px] h-[52px] rounded-full bg-[#1985cc] border-[3px] border-[#343434]/30 flex items-center justify-center shadow-[0_0_25.097px_0.988px_rgba(0,0,0,0.05)]">
          <UserRound className="w-[24px] h-[24px] text-white" strokeWidth={2.4} />
        </button>
        <button
          onClick={onExit}
          className="w-[52px] h-[52px] rounded-full bg-white/25 border border-[#828282]/15 flex items-center justify-center shadow-[0_0_25.097px_0.988px_rgba(0,0,0,0.05)]"
        >
          <img src={headerAssets.settingsIcon} alt="Close settings" className="w-[24px] h-[24px] object-contain" />
        </button>
      </div>

      <aside
        className="absolute left-0 top-[56px] bottom-0 w-[286px] rounded-tr-[15px] border-r border-[#dcdcdc]/25"
        style={{
          backgroundColor: '#ebebeb',
          backdropFilter: 'blur(60.7px)',
        }}
      >
        <div className="pt-[54px] px-[28px] flex flex-col gap-[4px]">
          {sideNavItems.map((item) => (
            <SettingsNavItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={item.action === 'home' ? onExit : undefined}
            />
          ))}
        </div>
      </aside>

      <main className="absolute left-[220px] right-[18px] top-[56px] bottom-[18px]">
        <section className="relative rounded-[18px] overflow-hidden h-[306px] shadow-[0_8px_28px_rgba(0,0,0,0.14)]">
          <img
            src={SETTINGS_SCREEN_ASSETS.heroFlowers}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.2)_38%,rgba(0,0,0,0.08)_100%)]" />
          <div className="relative z-10 px-[48px] pt-[22px] text-white">
            <div className="flex items-center gap-[24px] text-[16px]">
              {settingsTabs.map((tab, index) => (
                <button
                  key={tab}
                  className={`pb-[10px] border-b-[4px] ${index === 0 ? 'border-[#d3d3d3] text-[#d3d3d3] font-bold' : 'border-transparent text-white/92'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="h-[3px] bg-white mt-[2px] opacity-85" />
            <h1 className="mt-[52px] text-center text-white text-[68px] font-light tracking-[-3px] leading-[1.02]">
              Guten Tag, Lenz
            </h1>
          </div>
        </section>

        <section
          className="relative -mt-[54px] ml-[16px] mr-[16px] h-[calc(100%-252px)] rounded-[29px] border border-[#e9e9e9] bg-[rgba(235,235,235,0.8)] overflow-hidden"
          style={{ backdropFilter: 'blur(45.2px)' }}
        >
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[156px] h-[156px] rounded-full bg-[#f0f0f0] border border-[#f0f0f0] p-[8px]">
            <div className="w-full h-full rounded-full overflow-hidden border-[2px] border-white">
              <img
                src={SETTINGS_SCREEN_ASSETS.profileAvatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <button
            className="absolute top-[22px] right-[22px] w-[28px] h-[28px] rounded-full bg-[#1985cc] text-white flex items-center justify-center"
            aria-label="Information"
          >
            <Info className="w-[14px] h-[14px]" strokeWidth={2.4} />
          </button>

          <div className="pt-[72px] h-full overflow-y-auto no-scrollbar">
            <div className="flex justify-center gap-[22px] text-[19.263px] font-bold">
              <button className="text-[#535862]">Delete</button>
              <button className="text-[#1985cc]">Update</button>
            </div>

            <div className="px-[54px] pt-[18px] pb-[36px]">
              <div className="pb-[28px] border-b border-[#e9eaeb]">
                <h2 className="text-[#181d27] text-[22.998px] font-bold">Profile</h2>
                <p className="mt-[4px] text-[#535862] text-[17.887px]">
                  Update your photo and personal details here.
                </p>
              </div>

              <div className="pt-[28px] flex flex-col gap-[28px]">
                <div className="flex gap-[40px] items-start">
                  <FieldLabel title="Username" required />
                  <div className="flex-1">
                    <InputShell>
                      <div className="h-full px-[18px] flex items-center text-[#535862] text-[20.442px] border-r border-[#d5d7da] rounded-l-[34px]">
                        profile.meetportico.com/
                      </div>
                      <input
                        defaultValue="Lenz"
                        className="flex-1 h-full rounded-r-[34px] px-[18px] text-[#181d27] text-[20.442px] bg-transparent outline-none"
                      />
                    </InputShell>
                  </div>
                </div>

                <div className="flex gap-[40px] items-start">
                  <FieldLabel title="Job title" />
                  <div className="flex-1 flex flex-col gap-[18px]">
                    <InputShell className="px-[18px]">
                      <input
                        defaultValue="Expert designer"
                        className="w-full h-full text-[#181d27] text-[20.442px] bg-transparent outline-none"
                      />
                    </InputShell>
                    <label className="flex items-center gap-[10px] text-[#414651] text-[17.887px] font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showJobTitle}
                        onChange={(event) => setShowJobTitle(event.target.checked)}
                        className="w-[20px] h-[20px] rounded-[4px] accent-[#343434]"
                      />
                      <span>Show my job title in my profile</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-[40px] items-start">
                  <FieldLabel
                    title="Alternative contact email"
                    description="Enter an alternative email if you’d like to be contacted via a different email."
                  />
                  <div className="flex-1">
                    <InputShell className="px-[18px] gap-[10px]">
                      <Mail className="w-[22px] h-[22px] text-[#a4a7ae]" strokeWidth={2} />
                      <input
                        defaultValue="judas@hell.de"
                        className="flex-1 h-full text-[#717680] text-[20.442px] bg-transparent outline-none"
                      />
                    </InputShell>
                  </div>
                </div>
              </div>

              <div className="mt-[34px] pt-[24px] border-t border-[#e9eaeb] flex justify-end gap-[14px]">
                <button className="h-[52px] px-[22px] rounded-[34px] bg-white border border-[#d5d7da] text-[#414651] text-[17.887px] font-bold shadow-[0_1.278px_2.555px_0_rgba(10,13,18,0.05)]">
                  Cancel
                </button>
                <button className="h-[52px] px-[22px] rounded-[34px] bg-[#1985cc] border-[2px] border-white/15 text-white text-[17.887px] font-bold shadow-[0_1.278px_2.555px_0_rgba(10,13,18,0.05)]">
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
