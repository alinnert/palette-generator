import { atom, type WritableAtom } from 'nanostores'
import { outputPalettes } from '../../outputPalettes'
import { getStorageKey } from './settingsStorage'

function readStorageStringValue(key: string, defaultValue: string): string {
  return localStorage.getItem(getStorageKey(key)) ?? defaultValue
}

function writeStorageStringValue(key: string, value: string): void {
  localStorage.setItem(getStorageKey(key), value)
}

export function syncSelectInput(elementId: string, settingsAtom: WritableAtom<string>): void {
  const element = document.getElementById(elementId)
  if (element === null || !(element instanceof HTMLSelectElement)) return

  element.value = settingsAtom.get()

  element.addEventListener('change', () => {
    settingsAtom.set(element.value)
    writeStorageStringValue(elementId, element.value)
    outputPalettes()
  })
}

type SelectSettingOptions = { initialValue: string }

export function initSelectSetting(
  id: string,
  { initialValue }: SelectSettingOptions,
): WritableAtom<string> {
  const storedValue = readStorageStringValue(id, initialValue)
  const state = atom<string>(storedValue)
  syncSelectInput(id, state)
  return state
}
