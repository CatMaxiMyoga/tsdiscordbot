import { CommandInteraction, CacheType } from 'discord.js';

const Command_Say = async (interaction: CommandInteraction<CacheType>) => {
  const message = (interaction.options.get('message')?.value as string)
    .replace(/\\n/g, '\n')
    .replace(/\\\n/g, '\\n');
  await interaction.reply({ content: message })
};

export default Command_Say;