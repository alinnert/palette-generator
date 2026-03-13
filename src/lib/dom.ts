import type { WritableAtom } from 'nanostores'
import { outputPalettes } from '../outputPalettes'

export const colorsElement = document.getElementById('colors')

function onInput(id: string, cb: (e: number) => void): void {
  document.getElementById(id)?.addEventListener('input', (e) => {
    return cb(Number.parseFloat((e.target as HTMLInputElement).value))
  })
}

export function syncValueInput(elementId: string, settingsAtom: WritableAtom<number>): void {
  onInput(elementId, (v) => {
    settingsAtom.set(v)
    outputPalettes()
  })
}
