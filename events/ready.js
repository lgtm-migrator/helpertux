import BaseEvent from '../structures/event/baseEvent.js';
import {cacheRepo} from '../utils/repoSyncer.js';

/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @class Ready
 * @augments BaseEvent
 */
export default class Ready extends BaseEvent {
  /**
   * @class
   * @param {import('../structures/core/tux.js').HelperTux}  tux - tux, extended discord.js client
   */
  constructor(tux) {
    super(tux, 'ready');
  }

  /**
   * @function execute
   */
  execute() {
    this.tux.logger.log(
      `Connected as ${this.tux.user.tag}`,
      'Connected!',
      'Ready'
    );
    cacheRepo(this.tux);
    this.tux.rebornRepo.delete('elementary-theme');
  }
}
