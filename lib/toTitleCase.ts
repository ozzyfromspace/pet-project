export function toTitleCase(input: string) {
  const first = input.substring(0, 1).toUpperCase()
  const rest = input.substring(1).toLowerCase()
  return `${first}${rest}`
}
