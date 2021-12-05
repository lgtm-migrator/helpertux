/**
 * @author SoulHarsh007 <harsh.peshwani@outlook.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @function classId
 * @param {any} value - Input to check
 * @returns {string} - Input's class name
 */
export function classId(value) {
  switch (typeof value) {
    case 'object':
      return value === null
        ? 'null'
        : (value.constructor && value.constructor.name) || 'any';
    case 'function':
      return `${value.constructor.name}(Expected Params: ${value.length})`;
    case 'undefined':
      return 'void';
    default:
      return typeof value;
  }
}
