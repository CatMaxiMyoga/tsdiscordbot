import { CommandInteraction, CacheType, CommandInteractionOptionResolver } from 'discord.js';

const Command_Say = async (interaction: CommandInteraction<CacheType>) => {
  const options = interaction.options as CommandInteractionOptionResolver;
  const message = options.getString('message', true)
    .replace(/\\n/g, '\n')
    .replace(/\\\n/g, '\\n');
  await interaction.reply({ content: message })
};

export default Command_Say;