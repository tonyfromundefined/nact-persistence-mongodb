/**
 * https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L11953-L11975
 */
export function isNil<T>(
  value: T | undefined | null,
): value is undefined | null {
  return value == null;
}
