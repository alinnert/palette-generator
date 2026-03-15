import type { Oklch } from 'culori'
import { maxChromaAtLightness } from '../appSettings'
import { triangularValue } from './math'

export function getSwatchForHueAndLightness(h: number, l: number, baseC: number): Oklch {
  const cFactor = triangularValue(l, maxChromaAtLightness.get())
  const c = cFactor * baseC

  return { mode: 'oklch', l, c, h } as Oklch
}
