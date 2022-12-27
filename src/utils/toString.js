export function toString(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return String(value);
}
