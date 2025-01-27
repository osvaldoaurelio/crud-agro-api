/**
 * Remove all characters that are not numbers from a string.
 * Return the original value if it's not a string.
 * @param value The value to be processed.
 * @returns A string containing only numbers or the original value.
 */
export function removeNonNumeric(value: unknown): unknown {
  return typeof value === 'string' ? value.replace(/\D/g, '') : value;
}
/**
 * Remove all spaces from the beginning and end of a string.
 * Return the original value if it's not a string.
 * @param value The value to be processed.
 * @returns A string without spaces or the original value.
 */
export function trimString(value: unknown): unknown {
  return typeof value === 'string' ? value.trim() : value;
}
