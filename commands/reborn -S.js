import BaseCommand from '../structures/command/baseCommand.js';
import {MessageEmbed} from 'discord.js';
import convert from 'pretty-bytes';

/**
 * @author SoulHarsh007 <harsh.peshwani@outlook.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @class InfoReborn
 * @augments BaseCommand
 * @exports InfoReborn
 */
export default class InfoReborn extends BaseCommand {
  /**
   * @class
   * @param {import('../structures/core/tux.js').HelperTux}  tux - tux, extended discord.js client
   */
  constructor(tux) {
    super(tux, {
      name: 'reborn -S',
      usage: 'used to get info for a Reborn-OS repo package',
      example: prefix => `${prefix}${this.name} brave-bin`,
      cooldown: 2500,
    });
  }

  /**
   * @function execute
   * @param {import('discord.js').Message} msg - the message object
   * @param {string[]} args - arguments provided by user
   * @returns {import('discord.js').Message | void} - returns a promise which resolves to discord.js message
   */
  execute(msg, args) {
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
    return msg.channel.send({
      embed: new MessageEmbed()
        .setTitle(`${results[0].NAME} ${results[0].VERSION}`)
        .setURL(results[0].URL)
        .setColor('BLUE')
        .addFields([
          {
            name: 'Arch:',
            value: `${results[0]?.ARCH}`,
            inline: true,
          },
          {
            name: 'Base Package:',
            value: `${results[0]?.BASE}`,
            inline: true,
          },
          {
            name: 'Desc:',
            value: `${results[0]?.DESC}`,
            inline: true,
          },
          {
            name: 'Licenses:',
            value: `${results[0]?.LICENSE?.toString()}`,
            inline: true,
          },
          {
            name: 'Groups:',
            value: results[0]?.GROUPS?.toString() || 'None',
            inline: true,
          },
          {
            name: 'Replaces:',
            value: results[0]?.REPLACES?.toString() || 'None',
            inline: true,
          },
          {
            name: 'Conflicts:',
            value: results[0]?.CONFLICTS?.toString() || 'None',
            inline: true,
          },
          {
            name: 'Provides:',
            value: results[0]?.PROVIDES?.toString() || 'None',
            inline: true,
          },
          {
            name: 'Package Size:',
            value: `${convert(
              parseInt(results[0].ISIZE, 10)
            )} (Compressed: ${convert(parseInt(results[0].CSIZE, 10))})`,
            inline: true,
          },
          {
            name: 'Packager:',
            value: `${results[0].PACKAGER}`,
            inline: true,
          },
          {
            name: 'Build Date:',
            value: `${new Date(results[0].BUILDDATE * 1000).toUTCString()}`,
            inline: true,
          },
          {
            name: `Dependencies (${results[0]?.DEPENDS?.length || 0}):`,
            value: results[0]?.DEPENDS?.toString() || 'None',
            inline: true,
          },
          {
            name: `Optional Dependencies (${
              results[0]?.OPTDEPENDS?.length || 0
            }):`,
            value:
              results[0]?.OPTDEPENDS?.map(x =>
                x.split(':').shift()
              ).toString() || 'None',
            inline: true,
          },
          {
            name: 'Make Dependencies:',
            value: `${results[0]?.MAKEDEPENDS || 0} make dependencies`,
            inline: true,
          },
          {
            name: 'Check Dependencies:',
            value: `${results[0]?.CHECKDEPENDS?.length || 0} make dependencies`,
            inline: true,
          },
        ]),
    });
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
        ...this.tux.rebornRepo.filter(pkg => pkg.NAME === name).values(),
      ],
    };
  }
}
