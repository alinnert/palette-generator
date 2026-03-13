import { syncInput } from './dom'
import { generatePalettes } from './generatePalettes'
import { inputValue } from './inputValue'
import './style.css'

export const labelDigits = 2

export type Settings = {
  lCount: number
  hCount: number
  cFactor: number
  cwMixStrength: number
}

export const settings: Settings = {
  lCount: inputValue('l-count'),
  hCount: inputValue('h-count'),
  cFactor: inputValue('c-factor'),
  cwMixStrength: inputValue('cw-mix-strength'),
}

syncInput('l-count', 'lCount')
syncInput('h-count', 'hCount')
syncInput('c-factor', 'cFactor')
syncInput('cw-mix-strength', 'cwMixStrength')

generatePalettes()
