import { NeonText } from './NeonText';
import type { NeonConfig, NeonPreset } from '@/state/neon';

type PreviewStageProps = {
  config: NeonConfig;
  preset: NeonPreset;
};

export function PreviewStage({ config, preset }: PreviewStageProps) {
  return (
    <div
      className="preview-stage"
      style={{
        background: config.background,
      }}
    >
      <div className="preview-frame">
        <div className="frame-orb frame-orb-a" aria-hidden="true" />
        <div className="frame-orb frame-orb-b" aria-hidden="true" />
        <div className="frame-grid" aria-hidden="true" />
        <NeonText config={config} />
      </div>
    </div>
  );
}
