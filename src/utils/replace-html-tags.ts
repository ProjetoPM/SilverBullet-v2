export const replaceHtmlTags = (html: string) => {
  return html.replace(/<[^>]+>/g, ' ')
}

export const removeHtmlEscapeCodes = (html: string) => {
  return html.replace(/&[a-zA-Z]+;/g, '')
}

export const params = (key: string, number: number) => {
  return { params: { i18n: { key: key, values: { value: number } } } }
}

export const html = (html: string, number: number, type: '<=' | '>=') => {
  const text = html
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-zA-Z]+;/g, '')
    .trim()

  switch (type) {
    case '<=':
      return text.length <= number
    case '>=':
      return text.length >= number
    default:
      text.length === number
  }
}
