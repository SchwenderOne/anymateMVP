import { useDevMode } from '../context/useDevMode';
import { Pencil, RotateCcw, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { FIRST_SCREEN_TOKENS } from '../constants/firstScreenTokens';

/* ── Slider Row ────────────────────────────────────────────── */

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center text-[13px]">
        <span className="text-[#343434]/80 font-medium">{label}</span>
        <span className="text-[#343434] font-semibold tabular-nums">
          {Number.isInteger(value) ? value : value.toFixed(1)}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-[6px] rounded-full appearance-none cursor-pointer accent-[#1985cc] bg-black/10"
      />
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[11px] font-semibold tracking-[0.5px] uppercase text-[#343434]/50">
        {title}
      </h3>
      {children}
    </div>
  );
}

function normalizeGradientInput(value: string) {
  const trimmedValue = value.trim();
  if (!trimmedValue) return '';

  const declarationMatch = trimmedValue.match(/^background-image\s*:\s*(.+?)\s*;?$/i);
  return declarationMatch ? declarationMatch[1].trim() : trimmedValue;
}

/* ── Panel ─────────────────────────────────────────────────── */

export function DevPanel() {
  const {
    isOpen,
    close,
    overrides,
    setOverride,
    resetDefaults,
    savedGradients,
    addSavedGradient,
    updateSavedGradient,
    removeSavedGradient,
  } = useDevMode();
  const [gradientInput, setGradientInput] = useState(`background-image: ${overrides.gradient};`);

  function applyGradient() {
    const nextGradient = normalizeGradientInput(gradientInput);
    if (!nextGradient) return;
    setOverride('gradient', nextGradient);
    setGradientInput(`background-image: ${nextGradient};`);
  }

  function saveGradient() {
    const nextGradient = normalizeGradientInput(gradientInput);
    if (!nextGradient) return;
    addSavedGradient(nextGradient);
    setOverride('gradient', nextGradient);
    setGradientInput(`background-image: ${nextGradient};`);
  }

  function resetPanelDefaults() {
    resetDefaults();
    setGradientInput(`background-image: ${FIRST_SCREEN_TOKENS.gradients.warmBackground};`);
  }

  function selectSavedGradient(gradient: string) {
    setGradientInput(`background-image: ${gradient};`);
    setOverride('gradient', gradient);
  }

  function updateGradient(existingGradient: string) {
    const nextGradient = normalizeGradientInput(gradientInput);
    if (!nextGradient) return;
    updateSavedGradient(existingGradient, nextGradient);
    setGradientInput(`background-image: ${nextGradient};`);
  }

  function deleteGradient(gradient: string) {
    const fallbackGradient = savedGradients.find((savedGradient) => savedGradient !== gradient) ?? FIRST_SCREEN_TOKENS.gradients.warmBackground;

    removeSavedGradient(gradient);

    if (overrides.gradient === gradient) {
      setOverride('gradient', fallbackGradient);
      setGradientInput(`background-image: ${fallbackGradient};`);
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[998] bg-black/10"
          onClick={close}
        />
      )}

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full z-[999] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: '360px',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div
          className="flex flex-col h-full border-l border-[#dcdcdc]/50 overflow-hidden"
          style={{
            backgroundColor: 'rgba(245, 245, 245, 0.85)',
            backdropFilter: 'blur(40px)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-black/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1985cc] animate-pulse" />
              <h2 className="text-[17px] font-semibold text-[#343434] tracking-[-0.2px]">
                Dev Mode
              </h2>
            </div>
            <button
              onClick={close}
              className="w-[30px] h-[30px] rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
            >
              <X className="w-4 h-4 text-[#343434]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-7">
            {/* Shortcut hint */}
            <div className="text-[11px] text-[#343434]/40 font-medium flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-black/5 text-[10px] font-semibold">⌘D</kbd>
              <span>to toggle</span>
              <span className="mx-1">·</span>
              <kbd className="px-1.5 py-0.5 rounded bg-black/5 text-[10px] font-semibold">Esc</kbd>
              <span>to close</span>
            </div>

            <Section title="Header">
              <SliderRow
                label="Transparency"
                value={overrides.headerTransparency}
                min={0}
                max={100}
                step={1}
                unit="%"
                onChange={(v) => setOverride('headerTransparency', v)}
              />
            </Section>

            <Section title="Sidebar">
              <SliderRow
                label="Transparency"
                value={overrides.sidebarTransparency}
                min={0}
                max={100}
                step={1}
                unit="%"
                onChange={(v) => setOverride('sidebarTransparency', v)}
              />
              <SliderRow
                label="Generate Button"
                value={overrides.generateButtonTransparency}
                min={0}
                max={100}
                step={1}
                unit="%"
                onChange={(v) => setOverride('generateButtonTransparency', v)}
              />
            </Section>

            <Section title="Overlay">
              <SliderRow
                label="Transparency"
                value={overrides.overlayTransparency}
                min={0}
                max={100}
                step={1}
                unit="%"
                onChange={(v) => setOverride('overlayTransparency', v)}
              />
              <SliderRow
                label="Blur"
                value={overrides.overlayBlur}
                min={0}
                max={100}
                step={0.5}
                unit="px"
                onChange={(v) => setOverride('overlayBlur', v)}
              />
            </Section>

            <Section title="Canvas">
              <SliderRow
                label="Transparency"
                value={overrides.canvasTransparency}
                min={0}
                max={100}
                step={1}
                unit="%"
                onChange={(v) => setOverride('canvasTransparency', v)}
              />
            </Section>

            <Section title="Background Gradient">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] text-[#343434]/80 font-medium">
                  CSS Gradient
                </label>
                <textarea
                  value={gradientInput}
                  onChange={(e) => setGradientInput(e.target.value)}
                  placeholder="background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);"
                  className="w-full h-[80px] bg-white/60 border border-black/10 rounded-[10px] px-3 py-2.5 text-[12px] font-mono text-[#343434] placeholder:text-[#343434]/30 resize-none outline-none focus:border-[#1985cc]/50 transition-colors"
                  spellCheck={false}
                />
                <div className="flex gap-2">
                  <button
                    onClick={applyGradient}
                    className="flex-1 h-[36px] rounded-[10px] bg-[#1985cc] text-white text-[12px] font-semibold transition-colors hover:bg-[#1570ad]"
                  >
                    Apply
                  </button>
                  <button
                    onClick={saveGradient}
                    className="flex-1 h-[36px] rounded-[10px] bg-black/5 text-[#343434] text-[12px] font-semibold transition-colors hover:bg-black/10"
                  >
                    Save to Library
                  </button>
                </div>
                {/* Preview swatch */}
                <div
                  className="w-full h-[32px] rounded-[8px] border border-black/10"
                  style={{ backgroundImage: normalizeGradientInput(gradientInput) || overrides.gradient }}
                />
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-[11px] font-semibold tracking-[0.4px] uppercase text-[#343434]/45">
                    Saved Gradients
                  </span>
                  <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                    {savedGradients.map((gradient, index) => {
                      const isActive = gradient === overrides.gradient;

                      return (
                        <div
                          key={`${gradient}-${index}`}
                          className={`w-full rounded-[10px] border px-2.5 py-2 transition-colors ${
                            isActive ? 'border-[#1985cc]/60 bg-[#1985cc]/8' : 'border-black/10 bg-white/45'
                          }`}
                        >
                          <button
                            onClick={() => selectSavedGradient(gradient)}
                            className="w-full text-left"
                          >
                          <div
                            className="h-[28px] w-full rounded-[7px] border border-black/10 mb-2"
                            style={{ backgroundImage: gradient }}
                          />
                          <span className="block text-[10px] leading-[1.35] text-[#343434]/72 font-mono break-all">
                            {gradient}
                          </span>
                          </button>
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={() => setGradientInput(`background-image: ${gradient};`)}
                              className="flex-1 h-[30px] rounded-[8px] bg-black/5 text-[#343434] text-[11px] font-semibold transition-colors hover:bg-black/10"
                            >
                              Load
                            </button>
                            <button
                              onClick={() => updateGradient(gradient)}
                              className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-black/5 text-[#343434] transition-colors hover:bg-black/10"
                              aria-label="Update saved gradient"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => deleteGradient(gradient)}
                              className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-black/5 text-[#343434] transition-colors hover:bg-black/10"
                              aria-label="Delete saved gradient"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Section>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-black/5">
            <button
              onClick={resetPanelDefaults}
              className="w-full h-[40px] rounded-[10px] bg-black/5 hover:bg-black/10 transition-colors flex items-center justify-center gap-2 text-[13px] font-medium text-[#343434]/70"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
