import { useMemo, useState } from 'react';
import { presets } from '@/data/presets';
import { defaultNeonConfig, type NeonConfig } from '@/state/neon';
import { EditorPanel } from '@/components/EditorPanel';
import { PreviewStage } from '@/components/PreviewStage';

export default function App() {
  const [config, setConfig] = useState<NeonConfig>(defaultNeonConfig);

  const activePreset = useMemo(
    () => presets.find((preset) => preset.id === config.presetId) ?? presets[0],
    [config.presetId],
  );

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="eyebrow">Neon Sign Studio</p>
            <p className="brand-subtitle">live effect lab for glowing signage</p>
          </div>
        </div>
        <div className="topbar-meta">
          <span>React</span>
          <span>TypeScript</span>
          <span>Vite</span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-badges">
            <span>텍스트 즉시 반영</span>
            <span>프리셋 기반 스타일</span>
            <span>실시간 글로우 튜닝</span>
          </div>
          <h1>입력하면 바로 네온사인이 살아나는 프로토타입</h1>
          <p className="lede">
            텍스트를 입력하고, 색과 글로우, 깜빡임을 조절하면서 네온 간판 스타일을
            실시간으로 탐색합니다.
          </p>
          <div className="hero-notes">
            <div>
              <strong>프리셋</strong>
              <span>Classic Pink, Cyber Blue, Retro Warm</span>
            </div>
            <div>
              <strong>조절값</strong>
              <span>색, 외곽선, 퍼짐, 깜빡임, 배경</span>
            </div>
          </div>
        </div>
        <PreviewStage config={config} preset={activePreset} />
      </section>

      <EditorPanel config={config} presets={presets} onChange={setConfig} />
    </main>
  );
}
