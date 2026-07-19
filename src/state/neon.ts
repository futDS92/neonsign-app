export type NeonPresetId = string;

export type NeonMotionMode =
  | 'hover'
  | 'bounce'
  | 'sway'
  | 'drift'
  | 'depth'
  | 'jitter'
  | 'flow'
  | 'ribbon'
  | 'stream'
  | 'orbit'
  | 'glide';

export type NeonMotionSpace = 'stationary' | 'flowing';

export type NeonPreset = {
  id: NeonPresetId;
  name: string;
  description: string;
  textColor: string;
  glowColor: string;
  glowStrength: number;
  glowBlur: number;
  strokeWidth: number;
  flicker: number;
  motion: number;
  motionSpeed: number;
  motionMode: NeonMotionMode;
  motionSpace: NeonMotionSpace;
  background: string;
};

export type NeonConfig = {
  text: string;
  fontFamily: string;
  fontSize: number;
  letterSpacing: number;
  align: 'left' | 'center' | 'right';
  presetId: NeonPresetId;
  textColor: string;
  glowColor: string;
  glowStrength: number;
  glowBlur: number;
  strokeWidth: number;
  flicker: number;
  motion: number;
  motionSpeed: number;
  motionMode: NeonMotionMode;
  motionSpace: NeonMotionSpace;
  background: string;
};

export const defaultNeonConfig: NeonConfig = {
  text: 'OPEN LATE',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: 88,
  letterSpacing: 2,
  align: 'center',
  presetId: 'classic-pink',
  textColor: '#ff8bd4',
  glowColor: '#ff3bbf',
  glowStrength: 0.85,
  glowBlur: 18,
  strokeWidth: 4,
  flicker: 0.14,
  motion: 0.08,
  motionSpeed: 0.55,
  motionMode: 'hover',
  motionSpace: 'stationary',
  background: '#05050a',
};
