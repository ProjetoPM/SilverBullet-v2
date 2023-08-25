import i18next from 'i18next'

/**
 * Format a date to a locale string.
 *
 * @param date the date to be formatted.
 * @returns the formatted date.
 */
export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
) => {
  if (!date) return

  if (typeof date === 'string') {
    date = new Date(date)
  }

  return new Intl.DateTimeFormat(i18next.language, {
    dateStyle: 'medium',
    ...options
  }).format(date)
}
