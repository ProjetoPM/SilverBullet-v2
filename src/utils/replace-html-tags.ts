export const replaceHtmlTags = (html: string) => {
  return html.replace(/<[^>]+>/g, ' ')
}
