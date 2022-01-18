export const domElements = ['div', 'p'] as const
export type DomElements = typeof domElements[number]