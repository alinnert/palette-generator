import { formatCss } from 'culori'
import { colorsElement } from './dom'
import { generateHues } from './generateHues'
import { generateLightnesses } from './generateLightnesses'
import { getBaseC } from './getBaseC'
import { getLightnessesForHue } from './getLightnessesForHue'
import { getSwatchForHueAndLightness } from './getSwatchForHueAndLightness'
import { labelDigits, settings } from './main'

const warmHue = 80
const coolHue = 260

export function generatePalettes(): void {
  if (colorsElement === null) return

  const hues = Array.from(generateHues(settings.hCount))
  const lightnesses = Array.from(
    generateLightnesses(settings.lCount),
  ).toReversed()

  colorsElement.style.gridTemplateColumns = `repeat(${lightnesses.length}, 1fr)`
  colorsElement.innerHTML = ''

  const palette = hues.map((h) => getLightnessesForHue(h, lightnesses))

  for (const hue of palette) {
    for (const swatch of hue) {
      const mixAmount = Math.abs(swatch.l - 0.5) * 2
      const baseC = getBaseC(swatch.h ?? 0)
      const warmMixSwatch = getSwatchForHueAndLightness(
        warmHue,
        swatch.l,
        baseC,
      )
      const coolMixSwatch = getSwatchForHueAndLightness(
        coolHue,
        swatch.l,
        baseC,
      )
      const mixSwatch = swatch.l > 0.5 ? warmMixSwatch : coolMixSwatch

      const cwSwatchStrength = mixAmount * 100 * (settings.cwMixStrength / 100)
      const baseSwatchStrength = 100 - cwSwatchStrength

      const c = `
      color-mix(
        in oklab,
        ${formatCss(swatch)} ${baseSwatchStrength}%,
        ${formatCss(mixSwatch)} ${cwSwatchStrength}%
      )`

      const html = `
      <div class="color" style="--c: ${c};">
        <div class="color-label">
          <div class="l-label">L ${swatch.l.toFixed(labelDigits)}</div>
          <div class="c-label">C ${swatch.c.toFixed(labelDigits)}</div>
          <div class="h-label">H ${swatch.h ?? 0}</div>
        </div>
      </div>`

      colorsElement.insertAdjacentHTML('beforeend', html)
    }
  }
}
