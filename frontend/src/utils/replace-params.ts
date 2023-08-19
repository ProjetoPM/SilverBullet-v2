/**
 * Substitui os valores entre `:` e `/` de uma rota dinâmica.
 *
 * @example
 *  replaceParams('/workspace/:id/users', '123') -> '/workspace/123/users'
 *  replaceParams('/workspace/:id/users/:userId', ['123', '345']) -> '/workspace/123/users/345'
 */
export const replaceParams = (route: string, values: string | string[]) => {
  let index = 0

  if (!Array.isArray(values)) {
    values = [values]
  }
  return route?.replace(/:[^/]+/g, () => values[index++])
}
