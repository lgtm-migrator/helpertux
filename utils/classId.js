/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @function classId
 * @param {any} value - Input to check
 * @returns {string} - Input's class name
 */
export function classId(value) {
  const type = typeof value;
  switch (type) {
    case 'object':
      return value === null
        ? 'null'
        : (value.constructor && value.constructor.name) || 'any';
    case 'function':
      return `${value.constructor.name}(Expected Params: ${value.length})`;
    case 'undefined':
      return 'void';
    default:
      return type;
  }
}
