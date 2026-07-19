import { useState } from 'react';
import { presets } from '@/data/presets';
import { defaultNeonConfig, type NeonConfig } from '@/state/neon';
import { EditorPanel } from '@/components/EditorPanel';
import { ChatComposer } from '@/components/ChatComposer';
import { PreviewStage } from '@/components/PreviewStage';

export default function App() {
  const [config, setConfig] = useState<NeonConfig>(defaultNeonConfig);
  const [isWingCollapsed, setIsWingCollapsed] = useState(false);

  return (
    <main
      className={`app-shell ${isWingCollapsed ? 'is-wing-collapsed' : ''}`}
      style={{
        ['--wing-width' as string]: isWingCollapsed ? '56px' : '320px',
      }}
    >
      <header className="topbar">
        <div className="brand-lockup brand-float">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p className="eyebrow">Neon Sign Studio</p>
            <p className="brand-subtitle">floating content, narrow wings</p>
          </div>
        </div>
        <div className="topbar-meta topbar-float">
          <span>React</span>
          <span>TypeScript</span>
        </div>
      </header>

      <section className="stage-shell">
        <PreviewStage config={config} />
        <EditorPanel
          config={config}
          presets={presets}
          onChange={setConfig}
          collapsed={isWingCollapsed}
          onToggleCollapsed={() => setIsWingCollapsed((current) => !current)}
        />
        <ChatComposer
          value={config.text}
          onChange={(text) => setConfig((current) => ({ ...current, text }))}
        />
      </section>
    </main>
  );
}
