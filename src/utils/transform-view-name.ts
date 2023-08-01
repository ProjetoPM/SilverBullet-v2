export const transformViewName = (input: string) => {
  return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}
