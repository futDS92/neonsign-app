import { PresetPicker } from './PresetPicker';
import { EffectSlider } from './EffectSlider';
import type { NeonConfig, NeonPreset } from '@/state/neon';

type EditorPanelProps = {
  config: NeonConfig;
  presets: NeonPreset[];
  onChange: (next: NeonConfig) => void;
};

function updateConfig(
  config: NeonConfig,
  onChange: (next: NeonConfig) => void,
  patch: Partial<NeonConfig>,
) {
  onChange({ ...config, ...patch });
}

export function EditorPanel({ config, presets, onChange }: EditorPanelProps) {
  return (
    <section className="editor-shell">
      <div className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Text</p>
            <h2>콘텐츠 입력</h2>
          </div>
          <div className="panel-chip">live typing</div>
        </div>

        <label className="field">
          <span>네온 문구</span>
          <input
            value={config.text}
            onChange={(event) => updateConfig(config, onChange, { text: event.target.value })}
            placeholder="텍스트를 입력하세요"
          />
        </label>

        <div className="grid-2">
          <label className="field">
            <span>글자색</span>
            <input
              type="color"
              value={config.textColor}
              onChange={(event) =>
                updateConfig(config, onChange, { textColor: event.target.value })
              }
            />
          </label>
          <label className="field">
            <span>글로우 색</span>
            <input
              type="color"
              value={config.glowColor}
              onChange={(event) =>
                updateConfig(config, onChange, { glowColor: event.target.value })
              }
            />
          </label>
        </div>

        <div className="grid-2">
          <label className="field">
            <span>폰트 크기</span>
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
            <span>자간</span>
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
        </div>

        <div className="control-hint">
          입력과 동시에 미리보기가 갱신되고, 프리셋을 누르면 효과 조합이 한 번에 바뀝니다.
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Effects</p>
            <h2>이펙트 조절</h2>
          </div>
          <div className="panel-chip">preset bank</div>
        </div>

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
              background: preset.background,
            })
          }
        />

        <EffectSlider
          label="글로우 강도"
          min={0}
          max={1}
          step={0.01}
          value={config.glowStrength}
          formatValue={(value) => `${Math.round(value * 100)}%`}
          onChange={(value) => updateConfig(config, onChange, { glowStrength: value })}
        />
        <EffectSlider
          label="글로우 퍼짐"
          min={0}
          max={40}
          step={1}
          value={config.glowBlur}
          formatValue={(value) => `${value}px`}
          onChange={(value) => updateConfig(config, onChange, { glowBlur: value })}
        />
        <EffectSlider
          label="외곽선 두께"
          min={0}
          max={10}
          step={1}
          value={config.strokeWidth}
          formatValue={(value) => `${value}px`}
          onChange={(value) => updateConfig(config, onChange, { strokeWidth: value })}
        />
        <EffectSlider
          label="깜빡임"
          min={0}
          max={0.4}
          step={0.01}
          value={config.flicker}
          formatValue={(value) => `${Math.round(value * 100)}%`}
          onChange={(value) => updateConfig(config, onChange, { flicker: value })}
        />

        <label className="field">
          <span>배경색</span>
          <input
            type="color"
            value={config.background}
            onChange={(event) =>
              updateConfig(config, onChange, { background: event.target.value })
            }
            />
        </label>

        <div className="control-hint">
          추천: 글로우 강도는 72% 이상, 퍼짐은 16px 전후가 가장 간판스럽습니다.
        </div>
      </div>
    </section>
  );
}
