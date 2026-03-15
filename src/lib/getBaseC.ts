import { clampChroma, type Oklch } from 'culori'
import { maxChromaAtLightness, staticChroma, useDynamicChroma } from '../appSettings'

export function getBaseC(h: number): number {
  const color: Oklch = { mode: 'oklch', l: maxChromaAtLightness.get(), c: 0.5, h }
  return useDynamicChroma.get() ? clampChroma(color, 'oklch').c : staticChroma.get()
}
