import type { FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')           // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '')      // Remove all non-word characters
    .toLowerCase()                // Convert to lowercase
    .replace(/--+/g, '-')         // Replace multiple hyphens with one
    .trim()

export const formatSlug = (fallback: string): FieldHook => ({ value, data, originalDoc }) => {
  // If a slug already exists and hasn't changed, keep it
  if (typeof value === 'string' && value.length > 0) {
    return format(value)
  }

  // Use the fallback field (usually 'title') to generate the slug
  const fallbackData = data?.[fallback] || originalDoc?.[fallback]

  if (fallbackData && typeof fallbackData === 'string') {
    return format(fallbackData)
  }

  return value
}