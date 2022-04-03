/**
 * @author SoulHarsh007 <harsh.peshwani@outlook.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @function asyncDetect
 * @param {any} input - Input to check
 * @returns {boolean} - true if async else false
 */
export function asyncDetect(input) {
  if (typeof input !== 'object' || input === null) {
    return false;
  }
  if (
    input instanceof Promise ||
    (typeof input.then === 'function' && typeof input.catch === 'function')
  ) {
    return true;
  }
  return false;
}
