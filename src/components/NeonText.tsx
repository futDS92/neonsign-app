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
      const speed = config.motionSpeed;
      const time = frame * 0.03 * (0.55 + speed * 1.15);
      const jitterSeed = Math.sin(frame * 0.91) + Math.cos(frame * 1.47);
      const traveling = config.motionSpace === 'flowing';
      const stretch = traveling ? 2.3 : 1.55;
      const intensity = drift * (traveling ? 2.2 : 1.75);

      switch (config.motionMode) {
        case 'bounce':
          setMotion({
            x: Math.sin(time * 0.75) * intensity * 5 * stretch,
            y: -Math.abs(Math.sin(time * 2.3)) * intensity * 34,
            rotate: Math.sin(time * 0.75) * intensity * 4,
            scale: 1 + Math.abs(Math.sin(time * 2.3)) * intensity * 0.1,
          });
          break;
        case 'sway':
          setMotion({
            x: Math.sin(time * 2.2) * intensity * 20 * stretch,
            y: Math.cos(time * 1.0) * intensity * 5,
            rotate: Math.sin(time * 1.2) * intensity * 4.2,
            scale: 1 + Math.sin(time * 0.8) * intensity * 0.06,
          });
          break;
        case 'flow':
          setMotion({
            x: Math.sin(time * 1.8) * intensity * (26 + 10 * stretch) + Math.sin(time * 0.35) * intensity * 10,
            y: Math.sin(time * 0.55) * intensity * 5,
            rotate: Math.sin(time * 0.55) * intensity * 3.2,
            scale: 1 + Math.sin(time * 0.4) * intensity * 0.03,
          });
          break;
        case 'ribbon':
          setMotion({
            x: Math.sin(time * 1.15) * intensity * (22 + 12 * stretch),
            y: Math.sin(time * 2.0) * intensity * 10,
            rotate: Math.sin(time * 0.95) * intensity * 4,
            scale: 1 + Math.sin(time * 0.55) * intensity * 0.04,
          });
          break;
        case 'stream':
          setMotion({
            x: Math.sin(time * 0.45) * intensity * (34 + 16 * stretch) + time * intensity * 10,
            y: Math.sin(time * 0.75) * intensity * 6,
            rotate: Math.sin(time * 0.3) * intensity * 2.2,
            scale: 1 + Math.sin(time * 0.25) * intensity * 0.03,
          });
          break;
        case 'orbit':
          setMotion({
            x: Math.sin(time * 1.25) * intensity * (18 + 10 * stretch),
            y: Math.cos(time * 1.25) * intensity * (14 + 8 * stretch),
            rotate: Math.sin(time * 1.25) * intensity * 3.6,
            scale: 1 + Math.sin(time * 1.25) * intensity * 0.03,
          });
          break;
        case 'drift':
          setMotion({
            x: Math.sin(time * 0.9) * intensity * (14 + 10 * stretch) + Math.cos(time * 0.3) * intensity * 6,
            y: Math.sin(time * 0.6) * intensity * 10,
            rotate: Math.cos(time * 0.35) * intensity * 2.1,
            scale: 1 + Math.sin(time * 0.45) * intensity * 0.04,
          });
          break;
        case 'depth':
          setMotion({
            x: Math.sin(time * 0.5) * intensity * 10 * stretch,
            y: Math.cos(time * 0.4) * intensity * 8,
            rotate: Math.sin(time * 0.45) * intensity * 2.2,
            scale: 1 + Math.sin(time * 1.8) * intensity * 0.16,
          });
          break;
        case 'jitter':
          setMotion({
            x: jitterSeed * intensity * 14 * stretch,
            y: Math.cos(frame * 1.13) * intensity * 8,
            rotate: Math.sin(frame * 0.83) * intensity * 8,
            scale: 1 + Math.sin(frame * 0.31) * intensity * 0.05,
          });
          break;
        case 'hover':
        default:
          setMotion({
            x: Math.sin(time * 1.4) * intensity * 12 * stretch,
            y: Math.cos(time * 1.1) * intensity * 9,
            rotate: Math.sin(time * 0.9) * intensity * 3.2,
            scale: 1 + Math.sin(time * 0.65) * intensity * 0.04,
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
  }, [config.flicker, config.motion, config.motionMode, config.motionSpace, config.motionSpeed]);

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
