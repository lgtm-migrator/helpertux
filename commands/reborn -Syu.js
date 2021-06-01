import BaseCommand from '../structures/command/baseCommand.js';
import {MessageEmbed} from 'discord.js';
import {fetchRepo, cacheRepo} from '../utils/repoSyncer.js';

/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @class RebornUpdater
 * @augments BaseCommand
 */
export default class RebornUpdater extends BaseCommand {
  /**
   * @class
   * @param {import('../structures/core/tux.js').HelperTux}  tux - tux, extended discord.js client
   */
  constructor(tux) {
    super(tux, {
      name: 'reborn -Syu',
      hidden: false,
      usage: 'used to sync Reborn-OS repo',
      example: prefix => `${prefix}${this.name}`,
    });
  }

  /**
   * @async
   * @param {import('discord.js').Message} msg -
   * @param {string[]} args - arguments provided by user
   */
  async execute(msg, args) {
    const msgOld = await msg.channel.send({
      embed: new MessageEmbed()
        .setTitle('Syncing Reborn-OS Repo...')
        .setDescription(':: Synchronizing package databases...')
        .setColor('BLUE'),
    });
    await fetchRepo(this.tux);
    msgOld.edit({
      embed: new MessageEmbed()
        .setTitle('Syncing Reborn-OS Repo...')
        .setDescription(
          ':: Synchronizing package databases...\n:: Starting full system upgrade...'
        )
        .setColor('BLUE'),
    });
    cacheRepo(this.tux);
    msgOld.edit({
      embed: new MessageEmbed()
        .setTitle('Syncing Reborn-OS Repo...')
        .setDescription(
          ':: Synchronizing package databases...\n:: Starting full system upgrade...\n:: Processing package changes...\n:: Repo updated...'
        )
        .setColor('BLUE'),
    });
  }
}
