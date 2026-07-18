type EffectSliderProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
};

export function EffectSlider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
}: EffectSliderProps) {
  return (
    <label className="field slider-field">
      <div className="field-row">
        <span>{label}</span>
        <strong>{formatValue(value)}</strong>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
