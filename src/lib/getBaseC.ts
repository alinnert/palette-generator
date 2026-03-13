import { clampChroma, type Oklch } from 'culori'
import { cFactor } from '../appSettings'
import { lPeak } from './getSwatchForHueAndLightness'

type Options = {
  useDynamicChroma: boolean
}

export function getBaseC(h: number, options?: Options): number {
  const { useDynamicChroma = false } = options ?? {}

  const color: Oklch = { mode: 'oklch', l: lPeak, c: 1, h }
  const maxBaseC = useDynamicChroma ? clampChroma(color, 'oklch').c : 0.2
  return maxBaseC * cFactor.get()
}
