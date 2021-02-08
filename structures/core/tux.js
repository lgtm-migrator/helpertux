import {Client, Collection} from 'discord.js';
import {Logger} from '../logger/logger.js';

/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @augments Client
 * @class HelperTux
 * @classdesc HelperTux extends client to add some cool features like logging!
 * @exports HelperTux
 */
export class HelperTux extends Client {
  /**
   * @class
   */
  constructor() {
    super({
      shards: 'auto',
      messageCacheMaxSize: 5,
      messageCacheLifetime: 7,
      messageSweepInterval: 15,
      messageEditHistoryMaxSize: 0,
      disableMentions: 'everyone',
      ws: {intents: ['GUILDS', 'GUILD_MESSAGES'], compress: true},
      presence: {
        activity: {
          name: 'HelperTux is here to save the day!',
          type: 'STREAMING',
        },
      },
    });
    this.aliases = new Collection();
    this.commands = new Collection();
    this.logger = new Logger();
    this.prefix = 'sudo ';
    this.rebornRepo = new Collection();
  }
}
