import { useEffect, useState } from 'react';
import type { NeonConfig } from '@/state/neon';

type NeonTextProps = {
  config: NeonConfig;
};

export function NeonText({ config }: NeonTextProps) {
  const [flicker, setFlicker] = useState(1);
  const [motion, setMotion] = useState({ x: 0, y: 0, rotate: 0 });

  useEffect(() => {
    let frame = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      frame += 1;
      const wobble = Math.sin(frame * 0.12) * config.flicker;
      const pulse = 1 - Math.max(0, wobble);
      setFlicker(Math.max(0.65, pulse));
      const drift = config.motion;
      setMotion({
        x: Math.sin(frame * 0.035) * drift * 8,
        y: Math.cos(frame * 0.028) * drift * 6,
        rotate: Math.sin(frame * 0.02) * drift * 1.8,
      });
      requestAnimationFrame(tick);
    };

    const handle = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(handle);
    };
  }, [config.flicker, config.motion]);

  return (
    <div
      className="neon-wordmark"
      style={{
        ['--neon-text' as string]: config.textColor,
        ['--neon-glow' as string]: config.glowColor,
        ['--neon-bg' as string]: config.background,
        ['--neon-glow-strength' as string]: config.glowStrength,
        ['--neon-glow-blur' as string]: `${config.glowBlur}px`,
        ['--neon-stroke' as string]: `${config.strokeWidth}px`,
        ['--neon-flicker' as string]: flicker,
        ['--neon-motion-x' as string]: `${motion.x}px`,
        ['--neon-motion-y' as string]: `${motion.y}px`,
        ['--neon-motion-rotate' as string]: `${motion.rotate}deg`,
        textAlign: config.align,
        fontFamily: config.fontFamily,
        fontSize: `${config.fontSize}px`,
        letterSpacing: `${config.letterSpacing}px`,
      }}
    >
      <span className="neon-layer neon-shadow" aria-hidden="true">
        {config.text || ' '}
      </span>
      <span className="neon-layer neon-glow" aria-hidden="true">
        {config.text || ' '}
      </span>
      <span className="neon-layer neon-core">{config.text || ' '}</span>
    </div>
  );
}
