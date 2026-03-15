import { converter, formatCss, formatHex, interpolate } from 'culori'
import {
  brightMixHue,
  brightMixStrength,
  copyToClipboardFormat,
  darkMixHue,
  darkMixStrength,
} from './appSettings'
import { labelDigits } from './constants'
import { generatePalettes } from './generatePalettes'
import { colorsElement } from './lib/dom'
import { formatColor } from './lib/formatColor'
import { getBaseC } from './lib/getBaseC'
import { getSwatchForHueAndLightness } from './lib/getSwatchForHueAndLightness'

const toOklab = converter('oklab')
const toOklch = converter('oklch')

export function outputPalettes(): void {
  if (colorsElement === null) return

  const palettes = generatePalettes()

  colorsElement.innerHTML = ''
  colorsElement.style.gridTemplateColumns = `repeat(${palettes[0].length}, 1fr)`

  for (const hue of palettes) {
    for (const color of hue) {
      const lightnessRelativeMixColorStrength = Math.abs(color.l - 0.5) * 2
      const baseC = getBaseC(color.h ?? 0)
      const mixColor =
        color.l > 0.5
          ? getSwatchForHueAndLightness(brightMixHue.get(), color.l, baseC)
          : getSwatchForHueAndLightness(darkMixHue.get(), color.l, baseC)

      const mixStrength = color.l > 0.5 ? brightMixStrength.get() : darkMixStrength.get()
      const finalMixColorStrength = lightnessRelativeMixColorStrength * 100 * (mixStrength / 100)
      const mixColorStrengthString = finalMixColorStrength.toFixed(1)

      const finalColor = toOklch(
        interpolate([toOklab(color), toOklab(mixColor)], 'oklab')(finalMixColorStrength / 100),
      )

      const html = document.createElement('div')
      html.classList.add('color')
      html.style.setProperty('--final-color', formatCss(finalColor))
      html.style.setProperty('--base-color', formatCss(color))
      html.style.setProperty('--mix-color', formatCss(mixColor))

      html.addEventListener('click', () => {
        navigator.clipboard.writeText(formatColor(finalColor, copyToClipboardFormat.get()))
      })

      html.innerHTML = `
      <div class="sub-color base">BASE</div>
      <div class="sub-color mix">MIX<br>${mixColorStrengthString}%</div>

      <div class="color-label">
        <div class="l-label">${finalColor.l.toFixed(labelDigits)} L</div>
        <div class="c-label">${finalColor.c.toFixed(labelDigits)} C</div>
        <div class="h-label">${(finalColor.h ?? 0).toFixed(labelDigits)} H</div>
        <div class="hex-label">${formatHex(finalColor)}</div>
      </div>
      `

      colorsElement.append(html)
    }
  }
}
