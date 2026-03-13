import { formatCss } from 'culori'
import { cwMixStrength } from './appSettings'
import { generatePalettes } from './generatePalettes'
import { colorsElement } from './lib/dom'
import { getBaseC } from './lib/getBaseC'
import { getSwatchForHueAndLightness } from './lib/getSwatchForHueAndLightness'

const labelDigits = 2
const warmHue = 80
const coolHue = 260

export function outputPalettes(): void {
  if (colorsElement === null) return

  const palettes = generatePalettes()

  let resultHtml = ''

  for (const hue of palettes) {
    for (const swatch of hue) {
      const mixAmount = Math.abs(swatch.l - 0.5) * 2
      const baseC = getBaseC(swatch.h ?? 0)
      const warmMixSwatch = getSwatchForHueAndLightness(warmHue, swatch.l, baseC)
      const coolMixSwatch = getSwatchForHueAndLightness(coolHue, swatch.l, baseC)
      const mixSwatch = swatch.l > 0.5 ? warmMixSwatch : coolMixSwatch

      const cwSwatchStrength = mixAmount * 100 * (cwMixStrength.get() / 100)
      const baseSwatchStrength = 100 - cwSwatchStrength

      const cwSwatchStrengthString = cwSwatchStrength.toFixed(1)
      const baseSwatchStrengthString = baseSwatchStrength.toFixed(1)

      const baseColor = formatCss(swatch)
      const mixColor = formatCss(mixSwatch)

      const mixedColor = `color-mix(in oklab, ${baseColor} ${baseSwatchStrength}%, ${mixColor} ${cwSwatchStrength}%)`

      const html = `
      <div
        class="color"
        style="
          --target-color: ${mixedColor};
          --base-color: ${baseColor};
          --mix-color: ${mixColor};
        "
      >
        <div class="sub-color base">BASE<br>${baseSwatchStrengthString}%</div>
        <div class="sub-color mix">MIX<br>${cwSwatchStrengthString}%</div>

        <div class="color-label">
          <div class="l-label">${swatch.l.toFixed(labelDigits)} L</div>
          <div class="c-label">${swatch.c.toFixed(labelDigits)} C</div>
          <div class="h-label">${(swatch.h ?? 0).toFixed(labelDigits)} H</div>
        </div>
      </div>`

      resultHtml += html
    }
  }

  colorsElement.style.gridTemplateColumns = `repeat(${palettes[0].length}, 1fr)`
  colorsElement.innerHTML = resultHtml
}
