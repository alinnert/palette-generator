import { type Oklch } from 'culori'
import { getBaseC } from './getBaseC'
import { getSwatchForHueAndLightness } from './getSwatchForHueAndLightness'

export function getLightnessesForHue(h: number, lightnesses: number[]): Oklch[] {
  const baseC = getBaseC(h)

  return lightnesses.map((l) => getSwatchForHueAndLightness(h, l, baseC))
}
