import { initBooleanSetting } from './lib/settings/booleanSetting'
import { initNumberSetting } from './lib/settings/numberSetting'
import { initSelectSetting } from './lib/settings/selectSetting'

export const lightnessSwatchesCount = initNumberSetting('lightness-swatches-count', {
  initialValue: 10,
})
export const hueSwatchesCount = initNumberSetting('hue-swatches-count', { initialValue: 6 })
export const useDynamicChroma = initBooleanSetting('use-dynamic-chroma', { initialValue: false })
export const staticChroma = initNumberSetting('static-chroma', { initialValue: 0.2 })
export const maxChromaAtLightness = initNumberSetting('max-chroma-at-lightness', {
  initialValue: 0.64,
})
export const brightMixStrength = initNumberSetting('bright-mix-strength', { initialValue: 50 })
export const brightMixHue = initNumberSetting('bright-mix-hue', { initialValue: 80 })
export const darkMixStrength = initNumberSetting('dark-mix-strength', { initialValue: 50 })
export const darkMixHue = initNumberSetting('dark-mix-hue', { initialValue: 260 })

initBooleanSetting('show-base-color', { initialValue: false })
initBooleanSetting('show-mix-color', { initialValue: false })

initBooleanSetting('show-lightness', { initialValue: false })
initBooleanSetting('show-chroma', { initialValue: false })
initBooleanSetting('show-hue', { initialValue: false })
initBooleanSetting('show-hex', { initialValue: false })

export const copyToClipboardFormat = initSelectSetting('copy-to-clipboard-format', {
  initialValue: 'hex',
})
