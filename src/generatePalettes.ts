import type { Oklch } from 'culori'
import { hCount, lCount } from './appSettings'
import { generateHues } from './generators/generateHues'
import { generateLightnesses } from './generators/generateLightnesses'
import { getLightnessesForHue } from './lib/getLightnessesForHue'

export function generatePalettes(): Oklch[][] {
  const hues = Array.from(generateHues(hCount.get()))
  const lightnesses = Array.from(generateLightnesses(lCount.get())).toReversed()
  return hues.map((h) => getLightnessesForHue(h, lightnesses))
}
