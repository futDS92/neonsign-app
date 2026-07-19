import { PresetPicker } from './PresetPicker';
import { EffectSlider } from './EffectSlider';
import type { NeonConfig, NeonMotionMode, NeonPreset } from '@/state/neon';

type EditorPanelProps = {
  config: NeonConfig;
  presets: NeonPreset[];
  onChange: (next: NeonConfig) => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

function updateConfig(
  config: NeonConfig,
  onChange: (next: NeonConfig) => void,
  patch: Partial<NeonConfig>,
) {
  onChange({ ...config, ...patch });
}

const motionModes: Array<{ id: NeonMotionMode; label: string; description: string }> = [
  { id: 'float', label: 'Float', description: 'Soft floating drift' },
  { id: 'bounce', label: 'Bounce', description: 'Vertical up and down' },
  { id: 'sway', label: 'Sway', description: 'Side to side motion' },
  { id: 'drift', label: 'Drift', description: 'Slow ambient movement' },
  { id: 'depth', label: 'Depth', description: 'Front and back feel' },
  { id: 'jitter', label: 'Jitter', description: 'Tighter handheld buzz' },
];

export function EditorPanel({
  config,
  presets,
  onChange,
  collapsed,
  onToggleCollapsed,
}: EditorPanelProps) {
  return (
    <aside className={`editor-shell ${collapsed ? 'is-collapsed' : ''}`}>
      <button
        type="button"
        className="wing-toggle"
        onClick={onToggleCollapsed}
        aria-label={collapsed ? 'Expand wing' : 'Collapse wing'}
      >
        <span className="wing-toggle-label">Setting</span>
        <span className="wing-toggle-icon">{collapsed ? '›' : '‹'}</span>
      </button>

      <div className="panel wing-panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Setting</p>
            <h2>Controls</h2>
          </div>
          <div className="panel-chip">toggle</div>
        </div>

        <div className="wing-section">
          <p className="wing-label">Color</p>
          <div className="grid-2">
            <label className="field">
              <span>Text color</span>
              <input
                type="color"
                value={config.textColor}
                onChange={(event) =>
                  updateConfig(config, onChange, { textColor: event.target.value })
                }
              />
            </label>
            <label className="field">
              <span>Glow color</span>
              <input
                type="color"
                value={config.glowColor}
                onChange={(event) =>
                  updateConfig(config, onChange, { glowColor: event.target.value })
                }
              />
            </label>
          </div>

          <label className="field">
            <span>Background color</span>
            <input
              type="color"
              value={config.background}
              onChange={(event) =>
                updateConfig(config, onChange, { background: event.target.value })
              }
            />
          </label>
        </div>

        <div className="wing-section">
          <p className="wing-label">Preset</p>
          <PresetPicker
            presets={presets}
            activePresetId={config.presetId}
              onSelect={(preset) =>
              onChange({
                ...config,
                presetId: preset.id,
                textColor: preset.textColor,
                glowColor: preset.glowColor,
                glowStrength: preset.glowStrength,
                glowBlur: preset.glowBlur,
                strokeWidth: preset.strokeWidth,
                flicker: preset.flicker,
                motion: preset.motion,
                motionMode: preset.motionMode,
                background: preset.background,
              })
            }
          />
        </div>

        <div className="wing-section">
          <p className="wing-label">Effects</p>
          <EffectSlider
            label="Glow strength"
            min={0}
            max={1}
            step={0.01}
            value={config.glowStrength}
            formatValue={(value) => `${Math.round(value * 100)}%`}
            onChange={(value) => updateConfig(config, onChange, { glowStrength: value })}
          />
          <EffectSlider
            label="Glow blur"
            min={0}
            max={40}
            step={1}
            value={config.glowBlur}
            formatValue={(value) => `${value}px`}
            onChange={(value) => updateConfig(config, onChange, { glowBlur: value })}
          />
          <EffectSlider
            label="Stroke width"
            min={0}
            max={10}
            step={1}
            value={config.strokeWidth}
            formatValue={(value) => `${value}px`}
            onChange={(value) => updateConfig(config, onChange, { strokeWidth: value })}
          />
          <EffectSlider
            label="Flicker"
            min={0}
            max={0.4}
            step={0.01}
            value={config.flicker}
            formatValue={(value) => `${Math.round(value * 100)}%`}
            onChange={(value) => updateConfig(config, onChange, { flicker: value })}
          />
        </div>

        <div className="wing-section wing-section-compact">
          <p className="wing-label">Typography</p>
          <label className="field">
            <span>Font size</span>
            <input
              type="range"
              min={40}
              max={160}
              value={config.fontSize}
              onChange={(event) =>
                updateConfig(config, onChange, { fontSize: Number(event.target.value) })
              }
            />
          </label>

          <label className="field">
            <span>Letter spacing</span>
            <input
              type="range"
              min={-2}
              max={12}
              value={config.letterSpacing}
              onChange={(event) =>
                updateConfig(config, onChange, { letterSpacing: Number(event.target.value) })
              }
            />
          </label>

          <label className="field">
            <span>Motion style</span>
            <select
              value={config.motionMode}
              onChange={(event) =>
                updateConfig(config, onChange, {
                  motionMode: event.target.value as NeonMotionMode,
                })
              }
            >
              {motionModes.map((mode) => (
                <option key={mode.id} value={mode.id}>
                  {mode.label} · {mode.description}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Motion intensity</span>
            <input
              type="range"
              min={0}
              max={0.25}
              step={0.01}
              value={config.motion}
              onChange={(event) =>
                updateConfig(config, onChange, { motion: Number(event.target.value) })
              }
            />
          </label>
        </div>

        <div className="control-hint">
          Tip: glow strength above 72% and blur around 16px gives the strongest sign feel.
        </div>
      </div>
    </aside>
  );
}
