export function inputValue(id: string): number {
  return Number.parseFloat((document.getElementById(id) as HTMLInputElement).value)
}
