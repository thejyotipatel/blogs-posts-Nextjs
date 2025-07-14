export function isAdmin() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAdmin') === 'true'
  }
  return false
}
