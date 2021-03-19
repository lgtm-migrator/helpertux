import BaseCommand from '../structures/command/baseCommand.js';
import {MessageEmbed} from 'discord.js';
import {centra} from '@nia3208/centra';
import cheerio from 'cheerio';

/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @class Wiki
 * @augments BaseCommand
 */
export default class Wiki extends BaseCommand {
  /**
   * @class
   * @param {import('../structures/core/tux.js').HelperTux}  tux - tux, extended discord.js client
   */
  constructor(tux) {
    super(tux, {
      name: 'wiki -s',
      hidden: false,
      usage: 'used to lookup arch wiki',
      aliases: ['wiki --search'],
      example: prefix => `${prefix}${this.name} torrent`,
    });
  }

  /**
   * @async
   * @param {import('discord.js').Message} msg -
   * @param {string[]} args - arguments provided by user
   * @returns {Promise<import('discord.js').Message>} - returns promise which resolves to discord.js message
   */
  async execute(msg, args) {
    if (!args.length) {
      return msg.reply({
        embed: new MessageEmbed()
          .setTitle('You must provide something to search for!')
          .setColor('RED'),
      });
    }
    const results = await this.searchWiki(args.join(' '));
    if (!results) {
      return msg.reply({
        embed: new MessageEmbed().setTitle('No results found').setColor('RED'),
      });
    }
    this.tux.logger.log(results, 'INFO', 'ArchWiki Lookup');
    const embedData = [];
    results.slice(0, 15).forEach(x =>
      embedData.push({
        name: x.title,
        value: `[Click Here](${x.url})`,
        inline: true,
      })
    );
    return msg.channel.send({
      embed: new MessageEmbed()
        .setTitle('ArchWiki Lookup Completed')
        .addFields(embedData)
        .setColor('BLUE'),
    });
  }

  /**
   * @typedef {{title: string, url: URL}[]} Results
   */

  /**
   * @async
   * @function searchWiki
   * @param {string} search - query to lookup for
   * @returns {Promise<Results>} returns an array of generated results
   */
  async searchWiki(search) {
    const results = [];
    const $ = cheerio.load(
      await centra('https://wiki.archlinux.org/index.php')
        .query({
          search,
          title: 'Special:Search',
          profile: 'default',
          fulltext: 1,
        })
        .text()
    );
    $('.mw-search-results')
      .find('.mw-search-result-heading')
      .each((i, elm) =>
        $(elm)
          .find('a')
          .each((j, a) =>
            results.push({
              title: $(a).attr('title'),
              url: `https://wiki.archlinux.org/${$(a).attr('href')}`,
            })
          )
      );
    return results;
  }
}
