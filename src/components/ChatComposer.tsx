import { useEffect, useState } from 'react';

type ChatComposerProps = {
  value: string;
  onChange: (next: string) => void;
};

export function ChatComposer({ value, onChange }: ChatComposerProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  return (
    <div className="chat-composer">
      <div className="chat-composer-shell">
        <div className="chat-composer-labels">
          <span>Content</span>
          <span>type a neon phrase</span>
        </div>
        <div className="chat-composer-row">
          <input
            value={draft}
            onChange={(event) => {
              const next = event.target.value;
              setDraft(next);
              onChange(next);
            }}
            placeholder="Type here and the neon updates instantly"
            aria-label="Neon text input"
          />
        </div>
      </div>
    </div>
  );
}
