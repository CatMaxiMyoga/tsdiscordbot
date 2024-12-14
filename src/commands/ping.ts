import Config from '../config';
import {
  CacheType,
  CommandInteraction,
  EmbedBuilder
} from 'discord.js';

export default async (
  interaction: CommandInteraction<CacheType>,
  config: Config
) => {
  const embed = new EmbedBuilder({
    description: 'Pong!',
    color: 0x0099ff,
    footer: {
      text: `Latency: ${interaction.client.ws.ping}ms`
    }
  });

  await interaction.reply({ embeds: [embed] });
};
