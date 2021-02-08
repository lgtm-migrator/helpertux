import {Collection} from 'discord.js';

/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @class Command
 * @classdesc base structure for command files
 */
export default class Command {
  /**
   * @class
   * @param {import('../core/tux.js').HelperTux} tux - tux, extended discord.js client
   * @param {{name: string, aliases: string[], hidden: boolean, example: string | Function, cooldown: number, usage: string}} data - Command information
   */
  constructor(tux, data = {}) {
    this.tux = tux;
    this.name = data.name || '';
    this.aliases = data.aliases || [];
    this.hidden = data.hidden || false;
    this.example = data.example || '';
    this.usage = data.usage || '';
    this.cooldown = data.cooldown || 1500;
    this.cooldowns = new Collection();
  }
}
