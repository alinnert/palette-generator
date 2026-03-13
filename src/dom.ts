import { generatePalettes } from './generatePalettes'
import { settings, type Settings } from './main'

export const colorsElement = document.getElementById('colors')

function onInput(id: string, cb: (e: number) => void): void {
  document.getElementById(id)?.addEventListener('input', (e) => {
    return cb(Number.parseFloat((e.target as HTMLInputElement).value))
  })
}

export function syncInput(
  elementId: string,
  settingsProperty: keyof Settings,
): void {
  onInput(elementId, (v) => {
    settings[settingsProperty] = v
    generatePalettes()
  })
}
