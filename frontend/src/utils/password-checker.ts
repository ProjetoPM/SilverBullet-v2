type LevelProps = {
  label: string
  color: string
}

const hasNumber = (text: string) => new RegExp(/[0-9]/).test(text)
const hasSpecial = (text: string) => new RegExp(/[!#@$%^&*)(+=._-]/).test(text)
const hasMixed = (text: string) =>
  new RegExp(/[a-z]/).test(text) && new RegExp(/[A-Z]/).test(text)

export const strengthColor = (count: number): LevelProps => {
  if (count < 2) return { label: 'password.poor', color: 'bg-red-500' }
  if (count < 3) return { label: 'password.weak', color: 'bg-yellow-500' }
  if (count < 4) return { label: 'password.normal', color: 'bg-yellow-700' }
  if (count < 5) return { label: 'password.good', color: 'bg-green-500' }
  if (count < 6) return { label: 'password.strong', color: 'bg-green-700' }
  return { label: 'password.poor', color: 'bg-red-500' }
}

export const strengthIndicator = (text: string) => {
  let strengths = 0
  if (text.length > 5) strengths += 1
  if (text.length > 7) strengths += 1
  if (hasNumber(text)) strengths += 1
  if (hasSpecial(text)) strengths += 1
  if (hasMixed(text)) strengths += 1
  return strengths
}
