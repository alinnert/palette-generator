export function* generateLightnesses(count: number): Generator<number> {
  if (count <= 2) throw new Error('Step must be greater than 2!')

  const lightnesses = new Array(count - 1)
    .fill(0)
    .map((_, i) => (1 / (count - 1)) * i)

  for (const l of lightnesses) {
    yield l
  }

  yield 1
}
