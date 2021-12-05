/**
 * @author SoulHarsh007 <harsh.peshwani@outlook.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @class Event
 * @classdesc base structure for event files
 */
export default class Event {
  /**
   * @class
   * @param {import('../core/tux.js').HelperTux} tux - tux, extended discord.js client
   * @param {string} name - event name
   */
  constructor(tux, name) {
    this.tux = tux;
    this.name = name || '';
  }
}
