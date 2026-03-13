import { atom } from 'nanostores'
import { inputValue } from './lib/inputValue'

export const lCount = atom(inputValue('l-count'))
export const hCount = atom(inputValue('h-count'))
export const cFactor = atom(inputValue('c-factor'))
export const cwMixStrength = atom(inputValue('cw-mix-strength'))
