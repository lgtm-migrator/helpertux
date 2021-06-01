import BaseCommand from '../structures/command/baseCommand.js';
import {MessageEmbed} from 'discord.js';
import convert from 'pretty-bytes';

/**
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @class SearchReborn
 * @augments BaseCommand
 * @exports SearchReborn
 */
export default class SearchReborn extends BaseCommand {
  /**
   * @class
   * @param {import('../structures/core/tux.js').HelperTux}  tux - tux, extended discord.js client
   */
  constructor(tux) {
    super(tux, {
      name: 'reborn -Ss',
      usage: 'used to search Reborn-OS repos for a package',
      example: prefix => `${prefix}${this.name} brave`,
      cooldown: 2500,
    });
  }

  /**
   * @async
   * @function execute
   * @param {import('discord.js').Message} msg - the message object
   * @param {string[]} args - arguments provided by user
   * @returns {Promise<import('discord.js').Message | void>} - returns a promise which resolves to discord.js message
   */
  async execute(msg, args) {
    if (!args.length) {
      return msg.reply({
        embed: new MessageEmbed()
          .setTitle('You must provide a package name!')
          .setColor('RED'),
      });
    }
    const {results} = this.getPinfo(args.join(' '));
    this.tux.logger.log(results, 'Success', 'RebornOS-Repo-Results');
    if (!results.length) {
      return msg.reply({
        embed: new MessageEmbed().setTitle('No results found').setColor('RED'),
      });
    }
    msg.channel.send({
      content: `I found ${results.length} results for this query!`,
      embed: new MessageEmbed()
        .setTitle('RebornOS Repo Search')
        .setColor('BLUE')
        .setDescription(
          results
            .map((x, i) => `#${i + 1} ${x.NAME}`)
            .slice(0, 10)
            .join('\n')
        )
        .setFooter(
          'Results are limited to 10 per search. Respond with c to cancel or a number to get info, this expires after 10 seconds.'
        ),
    });
    try {
      const collected = await msg.channel.awaitMessages(
        m => m.author.id === msg.author.id,
        {
          max: 1,
          time: 10000,
          dispose: true,
          errors: ['time'],
        }
      );
      if (collected.first().content.toLowerCase() === 'c') {
        return;
      }
      const action = collected
        .first()
        .content.toLowerCase()
        .startsWith(this.tux.prefix)
        ? parseInt(collected.first().content.slice(this.tux.prefix.length), 10)
        : parseInt(collected.first().content, 10);
      if (isNaN(action) || action > 10 || action > results.length) {
        return;
      }
      return msg.channel.send({
        embed: new MessageEmbed()
          .setTitle(
            `${results[action - 1].NAME} ${results[action - 1].VERSION}`
          )
          .setURL(results[action - 1].URL)
          .setColor('BLUE')
          .addFields([
            {
              name: 'Arch:',
              value: `${results[action - 1]?.ARCH}`,
              inline: true,
            },
            {
              name: 'Base Package:',
              value: `${results[action - 1]?.BASE}`,
              inline: true,
            },
            {
              name: 'Desc:',
              value: `${results[action - 1]?.DESC}`,
              inline: true,
            },
            {
              name: 'Licenses:',
              value: `${results[action - 1]?.LICENSE?.toString()}`,
              inline: true,
            },
            {
              name: 'Groups:',
              value: results[action - 1].GROUPS?.toString() || 'None',
              inline: true,
            },
            {
              name: 'Replaces:',
              value: results[action - 1]?.REPLACES?.toString() || 'None',
              inline: true,
            },
            {
              name: 'Conflicts:',
              value: results[action - 1]?.CONFLICTS?.toString() || 'None',
              inline: true,
            },
            {
              name: 'Provides:',
              value: results[action - 1]?.PROVIDES?.toString() || 'None',
              inline: true,
            },
            {
              name: 'Package Size:',
              value: `${convert(
                parseInt(results[action - 1].ISIZE)
              )} (Compressed: ${convert(parseInt(results[action - 1].CSIZE))})`,
              inline: true,
            },
            {
              name: 'Packager:',
              value: `${results[action - 1]?.PACKAGER}`,
              inline: true,
            },
            {
              name: 'Build Date:',
              value: `${new Date(
                results[action - 1].BUILDDATE * 1000
              ).toUTCString()}`,
              inline: true,
            },
            {
              name: `Dependencies (${
                results[action - 1].DEPENDS?.length || 0
              }):`,
              value: results[action - 1]?.DEPENDS?.toString() || 'None',
              inline: true,
            },
            {
              name: `Optional Dependencies (${
                results[action - 1]?.OPTDEPENDS?.length || 0
              }):`,
              value:
                results[action - 1]?.OPTDEPENDS?.map(x =>
                  x.split(':').shift()
                ).toString() || 'None',
              inline: true,
            },
            {
              name: 'Make Dependencies:',
              value: `${
                results[action - 1]?.MAKEDEPENDS || 0
              } make dependencies`,
              inline: true,
            },
            {
              name: 'Check Dependencies:',
              value: `${
                results[action - 1]?.CHECKDEPENDS?.length || 0
              } make dependencies`,
              inline: true,
            },
          ]),
      });
    } catch (error) {
      this.tux.logger.log(error, 'INFO', 'SearchEmbedTimeout');
    }
  }

  /**
   * @typedef {{NAME: string, BASE: string, ARCH: string, VERSION: string, DESC: string, URL: URL, FILENAME: string, CSIZE: string, ISIZE: string, BUILDDATE: number, PACKAGER: string, LICENSE: string[] | string, CONFLICTS: string[] | string, PROVIDES: string[] | string, REPLACES: string[] | string, DEPENDS: string[] | string, OPTDEPENDS: string[] | string, MAKEDEPENDS: string[] | string, CHECKDEPENDS: string[] | string, GROUPS: string[] | string}[]} Results
   */

  /**
   * @param {string} name - package name
   * @returns {{results: Results}} - Package information
   */
  getPinfo(name) {
    return {
      results: [
        ...this.tux.rebornRepo
          .filter(pkg => pkg.NAME.includes(name) || pkg.DESC.includes(name))
          .values(),
      ],
    };
  }
}
