export const colorsElement = document.getElementById('colors')

export function defineAndWriteToHtml<T extends string | number>(value: T, dataAttr: string): T {
  document.querySelectorAll(`[data-value="${dataAttr}"]`).forEach((el) => {
    el.textContent = typeof value === 'number' ? value.toString() : value
  })
  return value
}
