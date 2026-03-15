import { type WritableAtom, atom } from 'nanostores'
import { outputPalettes } from '../../outputPalettes'
import { getStorageKey } from './settingsStorage'

function readStorageNumberValue(key: string, defaultValue: number): number {
  const storedValue: string = localStorage.getItem(getStorageKey(key)) ?? ''
  const storedNumberValue = Number.parseFloat(storedValue)
  return Number.isNaN(storedNumberValue) ? defaultValue : storedNumberValue
}

function writeStorageNumberValue(key: string, value: number): void {
  localStorage.setItem(getStorageKey(key), value.toString())
}

export function syncNumberInput(elementId: string, settingsAtom: WritableAtom<number>): void {
  const element = document.getElementById(elementId)
  if (element === null || !(element instanceof HTMLInputElement)) return

  element.value = settingsAtom.get().toString()

  element.addEventListener('input', () => {
    const parsedValue = Number.parseFloat(element.value)
    settingsAtom.set(parsedValue)
    writeStorageNumberValue(elementId, parsedValue)
    outputPalettes()
  })
}

type NumberSettingOptions = { initialValue: number }

export function initNumberSetting(
  id: string,
  { initialValue }: NumberSettingOptions,
): WritableAtom<number> {
  const storedValue = readStorageNumberValue(id, initialValue)
  const state = atom<number>(storedValue)
  syncNumberInput(id, state)
  return state
}
