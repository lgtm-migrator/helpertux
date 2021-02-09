import BaseEvent from '../structures/event/baseEvent.js';

/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @class TuxError
 * @augments BaseEvent
 */
export default class TuxError extends BaseEvent {
  /**
   * @class
   * @param {import('../structures/core/tux.js').HelperTux}  tux - tux, extended discord.js client
   */
  constructor(tux) {
    super(tux, 'error');
  }

  /**
   * @function execute
   * @param {Error} error - Error object
   */
  execute(error) {
    this.tux.logger.log(error.stack, 'Error', 'ErrorEvent');
  }
}
