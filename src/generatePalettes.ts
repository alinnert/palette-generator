import type { Oklch } from 'culori'
import { hueSwatchesCount, lightnessSwatchesCount } from './appSettings'
import { generateHues } from './generators/generateHues'
import { generateLightnesses } from './generators/generateLightnesses'
import { getLightnessesForHue } from './lib/getLightnessesForHue'

export function generatePalettes(): Oklch[][] {
  const hues = Array.from(generateHues(hueSwatchesCount.get()))
  const lightnesses = Array.from(generateLightnesses(lightnessSwatchesCount.get())).toReversed()
  return hues.map((h) => getLightnessesForHue(h, lightnesses))
}
