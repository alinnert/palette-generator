export function triangularValue(x: number, xPeak: number): number {
  if (x < xPeak) {
    return x / xPeak
  }
  if (x > xPeak) {
    return 1 - (x - xPeak) / (1 - xPeak)
  }
  return 1
}
