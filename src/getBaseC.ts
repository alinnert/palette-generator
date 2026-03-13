import { settings } from './main'

export function getBaseC(h: number): number {
  // const maxBaseC = clampChroma({ mode: 'oklch', l: lPeak, c: 1, h }, 'oklch').c
  const maxBaseC = 0.2
  return maxBaseC * settings.cFactor
}
