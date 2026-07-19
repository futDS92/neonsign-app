import { useEffect, useState } from 'react';
import type { NeonConfig } from '@/state/neon';

type NeonTextProps = {
  config: NeonConfig;
};

export function NeonText({ config }: NeonTextProps) {
  const [flicker, setFlicker] = useState(1);
  const [motion, setMotion] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

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
      const time = frame * 0.02;
      const jitterSeed = Math.sin(frame * 0.91) + Math.cos(frame * 1.47);

      switch (config.motionMode) {
        case 'bounce':
          setMotion({
            x: Math.sin(time * 0.7) * drift * 2,
            y: -Math.abs(Math.sin(time * 2.2)) * drift * 16,
            rotate: Math.sin(time * 0.7) * drift * 1.2,
            scale: 1 + Math.abs(Math.sin(time * 2.2)) * drift * 0.04,
          });
          break;
        case 'sway':
          setMotion({
            x: Math.sin(time * 2.1) * drift * 14,
            y: Math.cos(time * 0.9) * drift * 3,
            rotate: Math.sin(time * 1.2) * drift * 2.8,
            scale: 1 + Math.sin(time * 0.8) * drift * 0.02,
          });
          break;
        case 'drift':
          setMotion({
            x: Math.sin(time * 0.9) * drift * 10 + Math.cos(time * 0.3) * drift * 4,
            y: Math.sin(time * 0.6) * drift * 7,
            rotate: Math.cos(time * 0.35) * drift * 1.2,
            scale: 1 + Math.sin(time * 0.45) * drift * 0.018,
          });
          break;
        case 'depth':
          setMotion({
            x: Math.sin(time * 0.5) * drift * 5,
            y: Math.cos(time * 0.4) * drift * 4,
            rotate: Math.sin(time * 0.45) * drift * 0.9,
            scale: 1 + Math.sin(time * 1.8) * drift * 0.09,
          });
          break;
        case 'jitter':
          setMotion({
            x: jitterSeed * drift * 7,
            y: Math.cos(frame * 1.13) * drift * 5,
            rotate: Math.sin(frame * 0.83) * drift * 4,
            scale: 1 + Math.sin(frame * 0.31) * drift * 0.02,
          });
          break;
        case 'float':
        default:
          setMotion({
            x: Math.sin(time * 1.4) * drift * 8,
            y: Math.cos(time * 1.1) * drift * 6,
            rotate: Math.sin(time * 0.9) * drift * 1.8,
            scale: 1 + Math.sin(time * 0.65) * drift * 0.015,
          });
          break;
      }
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
        ['--neon-motion-scale' as string]: motion.scale,
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
