import BaseEvent from '../structures/event/baseEvent.js';
import {
  fetchRepo,
  cacheRepo,
  fetchTLDR,
  cacheTLDR,
} from '../utils/repoSyncer.js';

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
   * @async
   * @function execute
   */
  async execute() {
    this.tux.logger.log(
      `Connected as ${this.tux.user.tag}`,
      'Connected!',
      'Ready'
    );
    await fetchRepo(this.tux);
    cacheRepo(this.tux);
    await fetchTLDR(this.tux);
    cacheTLDR(this.tux);
  }
}
