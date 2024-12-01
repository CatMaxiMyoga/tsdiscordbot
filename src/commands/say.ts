import Config from '../config';
import { CommandInteraction, CacheType, CommandInteractionOptionResolver } from 'discord.js';

export default async (interaction: CommandInteraction<CacheType>, config: Config) => {
  const options = interaction.options as CommandInteractionOptionResolver;
  const message = options.getString('message', true)
    .replace(/\\n/g, '\n')
    .replace(/\\\n/g, '\\n');
  await interaction.reply({ content: message })
};