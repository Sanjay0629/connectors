/**
 * generateUUID — safe cross-context UUID v4 generator.
 *
 * crypto.randomUUID() is restricted to secure contexts (HTTPS / localhost).
 * Over plain HTTP this API is unavailable, so we fall back to a
 * Math.random-based UUID v4 that is good enough for local UI identifiers
 * (page IDs, folder IDs, sticky-note IDs — none of these are security-critical).
 */
export function generateUUID() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }

  // RFC-4122 v4 UUID fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
