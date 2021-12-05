/**
 * @author SoulHarsh007 <harsh.peshwani@outlook.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @function sanitize
 * @param {string} input - Input to check
 * @param {string} output - Output to check
 * @returns {string | void} - Returns sanitized output
 */
export function sanitize(input, output) {
  if (!input || !output) {
    return;
  }
  return output
    .replace(
      new RegExp(input.replace(/[-/\\^$*+?.()|[\]{}]/gu, '\\$&'), 'giu'),
      '「ｒｅｄａｃｔｅｄ」'
    )
    .replace(/`/gu, `\`${String.fromCharCode(8203)}`)
    .replace(/@/gu, `@${String.fromCharCode(8203)}`);
}
