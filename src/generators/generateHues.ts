export function* generateHues(count: number): Generator<number> {
  if (count <= 0) throw new Error('Step must be positive and not 0!')

  let hues = new Array(count).fill(0).map((_, i) => (360 / count) * i)

  for (const h of hues) {
    yield h
  }
}
