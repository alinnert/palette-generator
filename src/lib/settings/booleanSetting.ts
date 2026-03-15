import { atom, type WritableAtom } from 'nanostores'
import { outputPalettes } from '../../outputPalettes'
import { getStorageKey } from './settingsStorage'

function readStorageBooleanValue(key: string, defaultValue: boolean): boolean {
  const storedValue = localStorage.getItem(getStorageKey(key))
  return storedValue === null ? defaultValue : storedValue === 'true'
}

function writeStorageBooleanValue(key: string, value: boolean): void {
  localStorage.setItem(getStorageKey(key), String(value))
}

export function syncBooleanInput(elementId: string, settingsAtom: WritableAtom<boolean>): void {
  const element = document.getElementById(elementId)
  if (element === null || !(element instanceof HTMLInputElement)) return

  element.checked = settingsAtom.get()

  element.addEventListener('change', () => {
    settingsAtom.set(element.checked)
    writeStorageBooleanValue(elementId, element.checked)
    outputPalettes()
  })
}

type BooleanSettingOptions = { initialValue: boolean }

export function initBooleanSetting(
  id: string,
  { initialValue }: BooleanSettingOptions,
): WritableAtom<boolean> {
  const storedValue = readStorageBooleanValue(id, initialValue)
  const state = atom<boolean>(storedValue)
  syncBooleanInput(id, state)
  return state
}
