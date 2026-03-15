/**
 * This functions gives you the `y` value for a given `x` value according follwing rules:
 * - `x` = `0` -> `y` = `0`
 * - `x` = `1` -> `y` = `0`
 * - `x` = `xPeak` -> `y` = `1`
 * - For all other values of `x` the value of `y` gets interpolated linearly.
 * @param x
 * The input value
 * @param xPeak
 * Determines for which value of `x` the value of `y` should be `1`.
 * @returns
 * The `y` value.
 */
export function triangularValue(x: number, xPeak: number): number {
  if (x < 0 || x > 1) {
    throw new Error('`x` must be between `0` and `1`!')
  }
  if (xPeak < 0 || xPeak > 1) {
    throw new Error('`xPeak` must be between `0` and `1`!')
  }

  if (x < xPeak) {
    return x / xPeak
  }
  if (x > xPeak) {
    return 1 - (x - xPeak) / (1 - xPeak)
  }
  return 1
}
