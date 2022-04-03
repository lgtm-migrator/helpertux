import BaseCommand from '../structures/command/baseCommand.js';
import {MessageEmbed} from 'discord.js';
import {readFileSync} from 'fs';

/**
 * @author SoulHarsh007 <harsh.peshwani@outlook.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @class TLDRInfo
 * @augments BaseCommand
 * @exports TLDRInfo
 */
export default class TLDRInfo extends BaseCommand {
  /**
   * @class
   * @param {import('../structures/core/tux.js').HelperTux}  tux - tux, extended discord.js client
   */
  constructor(tux) {
    super(tux, {
      name: 'tldr -S',
      usage: 'used to get tldr info of a package',
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
    const data = this.tux.tldr.get(args[0]);
    if (!data) {
      return msg.reply({
        embed: new MessageEmbed()
          .setTitle(
            `${args[0]}  documentation is not available. Consider contributing Pull Request to https://github.com/tldr-pages/tldr`
          )
          .setColor('RED'),
      });
    }
    return msg.channel.send({
      content: readFileSync(
        `./tldr/extracted/pages/${data.platform}/${data.name}.md`
      ),
      code: 'md',
      split: true,
      embed: new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`TLDR - ${args[0]}`)
        .addFields([
          {
            name: 'Available Languages:',
            value: `${data.language.toString()}`,
            inline: true,
          },
          {
            name: 'Command Platform:',
            value: `${data.platform.toString()}`,
            inline: true,
          },
        ]),
    });
  }
}
