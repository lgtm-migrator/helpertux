/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @function asyncDetect
 * @param {any} input - Input to check
 * @returns {boolean} - true if async else false
 */
export function asyncDetect(input) {
  if (typeof input !== 'object' || input === null) {
    return false;
  } else {
    if (input instanceof Promise) {
      return true;
    } else if (
      typeof input.then === 'function' &&
      typeof input.catch === 'function'
    ) {
      return true;
    }
  }
}
