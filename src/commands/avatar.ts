import { CommandInteraction, CacheType, CommandInteractionOptionResolver, EmbedBuilder } from 'discord.js'

const Command_Avatar = async (interaction: CommandInteraction<CacheType>) => {
  const options = interaction.options as CommandInteractionOptionResolver;

  const user = options.getUser('user', false) || interaction.user;

  const embed = new EmbedBuilder({
    color: 0x00ff00,
    title: `Avatar of ${user.username} | ${user.displayName}`,
    description: `[Link](${user.displayAvatarURL({
      size: 1024,
      extension: 'png'
    })})`,
    image: {
      url: user.displayAvatarURL({ size: 2048, extension: 'png' }),
    },
    timestamp: Date.now()
  })

  await interaction.reply({ embeds: [embed] });
};

export default Command_Avatar;