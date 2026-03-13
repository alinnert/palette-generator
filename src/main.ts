import { cFactor, cwMixStrength, hCount, lCount } from './appSettings'
import { outputPalettes } from './outputPalettes'
import { syncValueInput } from './lib/dom'
import './style.css'

syncValueInput('l-count', lCount)
syncValueInput('h-count', hCount)
syncValueInput('c-factor', cFactor)
syncValueInput('cw-mix-strength', cwMixStrength)

outputPalettes()
