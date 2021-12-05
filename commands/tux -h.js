import BaseCommand from '../structures/command/baseCommand.js';
import {MessageEmbed} from 'discord.js';

/**
 * @author SoulHarsh007 <harsh.peshwani@outlook.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @class Help
 * @augments BaseCommand
 */
export default class Help extends BaseCommand {
  /**
   * @class
   * @param {import('../structures/core/tux.js').HelperTux}  tux - tux, extended discord.js client
   */
  constructor(tux) {
    super(tux, {
      name: 'tux -h',
      hidden: false,
      usage: 'the help command',
      aliases: ['tux --help', 'tux help'],
      example: prefix => `${prefix}${this.name}`,
    });
  }

  /**
   * @async
   * @param {import('discord.js').Message} msg -
   * @param {string[]} args - arguments provided by user
   * @returns {Promise<import('discord.js').Message>} - returns promise which resolves to discord.js message
   */
  async execute(msg, args) {
    if (
      args.length &&
      (this.tux.commands.has(args.join(' ')) ||
        this.tux.aliases.has(args.join(' ')))
    ) {
      const cmd =
        this.tux.commands.get(args.join(' ')) ||
        this.tux.aliases.get(args.join(' '));
      return msg.channel.send({
        embed: new MessageEmbed()
          .setTitle(`Information for command: ${cmd.name}`)
          .setColor('BLUE')
          .addFields([
            {
              name: 'Command Aliases:',
              value: cmd.aliases.length ? cmd.aliases.join(', ') : 'No aliases',
              inline: true,
            },
            {
              name: 'Usage:',
              value: cmd.usage,
              inline: true,
            },
            {
              name: 'Example:',
              value: cmd.example(this.tux.prefix),
              inline: true,
            },
          ]),
      });
    }
    return msg.channel.send({
      embed: new MessageEmbed()
        .setTitle('Here is a list of my commands:')
        .setFooter(
          `For more info about a command run ${this.tux.prefix}${this.name} command-name`
        )
        .setColor('BLUE')
        .setDescription(
          `${this.tux.commands.map(x => `\`${x.name}\``).join(', ')}`
        ),
    });
  }
}
