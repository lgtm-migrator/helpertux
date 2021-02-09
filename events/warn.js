import BaseEvent from '../structures/event/baseEvent.js';

/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @class Warn
 * @augments BaseEvent
 */
export default class Warn extends BaseEvent {
  /**
   * @class
   * @param {import('../structures/core/tux.js').HelperTux}  tux - tux, extended discord.js client
   */
  constructor(tux) {
    super(tux, 'warn');
  }

  /**
   * @function execute
   * @param {string} warn - warning info from discord api
   */
  execute(warn) {
    this.tux.logger.log(warn, 'Warn', 'WarnEvent');
  }
}
