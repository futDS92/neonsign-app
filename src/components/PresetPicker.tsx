import type { NeonPreset } from '@/state/neon';

type PresetPickerProps = {
  presets: NeonPreset[];
  activePresetId: string;
  onSelect: (preset: NeonPreset) => void;
};

export function PresetPicker({ presets, activePresetId, onSelect }: PresetPickerProps) {
  return (
    <div className="preset-grid">
      {presets.map((preset) => {
        const active = preset.id === activePresetId;
        return (
          <button
            key={preset.id}
            type="button"
            className={`preset-card ${active ? 'is-active' : ''}`}
            onClick={() => onSelect(preset)}
          >
            <span className="preset-name">{preset.name}</span>
            <span className="preset-desc">{preset.description}</span>
          </button>
        );
      })}
    </div>
  );
}
