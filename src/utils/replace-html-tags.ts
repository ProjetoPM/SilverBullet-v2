export const replaceHtmlTags = (html: string) => {
  return html.replace(/<[^>]+>/g, ' ')
}

export const removeHtmlEscapeCodes = (html: string) => {
  return html.replace(/&[a-zA-Z]+;/g, '')
}

export const replaceHtmlTagsComparing = (
  html: string,
  number: number,
  type: '<' | '>' | '<=' | '>=' = '>='
) => {
  switch (type) {
    case '<':
      return (
        html
          .replace(/<[^>]+>/g, '')
          .replace(/&[a-zA-Z]+;/g, '')
          .trim().length < number
      )
    case '>':
      return (
        html
          .replace(/<[^>]+>/g, '')
          .replace(/&[a-zA-Z]+;/g, '')
          .trim().length > number
      )
    case '<=':
      return (
        html
          .replace(/<[^>]+>/g, '')
          .replace(/&[a-zA-Z]+;/g, '')
          .trim().length <= number
      )
    case '>=':
      return (
        html
          .replace(/<[^>]+>/g, '')
          .replace(/&[a-zA-Z]+;/g, '')
          .trim().length >= number
      )
    default:
      return (
        html
          .replace(/<[^>]+>/g, '')
          .replace(/&[a-zA-Z]+;/g, '')
          .trim().length >= number
      )
  }
}
