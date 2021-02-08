/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @function sanitize
 * @param {string} input - Input to check
 * @param {string} output - Output to check
 * @returns {string | void} - Returns sanitized output
 */
export function sanitize(input, output) {
  if (!input || !output) return;
  const REGEXPESC = /[-/\\^$*+?.()|[\]{}]/g;
  const zws = String.fromCharCode(8203);
  const sensitivePattern = new RegExp(input.replace(REGEXPESC, '\\$&'), 'gi');
  return output
    .replace(sensitivePattern, '「ｒｅｄａｃｔｅｄ」')
    .replace(/`/g, `\`${zws}`)
    .replace(/@/g, `@${zws}`);
}
