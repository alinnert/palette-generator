import { converter, formatCss, formatHex, formatHsl, formatRgb, type Color } from 'culori'

export function formatColor(color: Color, format: string): string {
  if (format === 'oklch') {
    if (color.mode === 'oklch') {
      return formatCss(color)
    }
    return formatCss(converter('oklch')(color))
  }

  if (format === 'hsl') {
    return formatHsl(color)
  }

  if (format === 'rgb') {
    return formatRgb(color)
  }

  if (format === 'hex-raw') {
    return formatHex(color).substring(1)
  }

  return formatHex(color)
}
