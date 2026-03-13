import type { Oklch } from 'culori'
import { triangularValue } from './triangularValue'

export const lPeak = 0.64

export function getSwatchForHueAndLightness(
  h: number,
  l: number,
  baseC: number,
): Oklch {
  const cFactor = triangularValue(l, lPeak)
  const c = cFactor * baseC

  return { mode: 'oklch', l, c, h } as Oklch
}
