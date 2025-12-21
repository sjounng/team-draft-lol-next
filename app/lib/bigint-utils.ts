/**
 * Safely converts a string to BigInt
 * @param value - The value to convert
 * @returns BigInt if valid, null if invalid
 */
export function safeBigInt(value: string | undefined | null): bigint | null {
  if (!value) return null

  try {
    return BigInt(value)
  } catch (error) {
    console.error('Invalid BigInt value:', value, error)
    return null
  }
}

/**
 * Converts a string to BigInt or throws an error
 * @param value - The value to convert
 * @param fieldName - Name of the field for error message
 * @throws Error if conversion fails
 */
export function parseBigInt(value: string | undefined | null, fieldName = 'ID'): bigint {
  const result = safeBigInt(value)

  if (result === null) {
    throw new Error(`Invalid ${fieldName}: ${value}`)
  }

  return result
}
