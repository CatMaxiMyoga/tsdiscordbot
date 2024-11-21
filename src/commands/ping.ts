import { CacheType, CommandInteraction, EmbedBuilder } from 'discord.js';

const Command_Ping = async (interaction: CommandInteraction<CacheType>) => {
  const embed = new EmbedBuilder({
    description: 'Pong!',
    color: 0x0099ff,
    footer: {
      text: `Latency: ${interaction.client.ws.ping}ms`
    }
  });

  await interaction.reply({ embeds: [embed] });
};

export default Command_Ping;