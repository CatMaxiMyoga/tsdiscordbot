import {
  CommandInteraction, CacheType, TextChannel, Webhook, WebhookType, EmbedBuilder,
  CommandInteractionOptionResolver
} from 'discord.js'

const Command_Webhook = async (interaction: CommandInteraction<CacheType>) => {
  const options = interaction.options as CommandInteractionOptionResolver;
  
  if (!(interaction.channel instanceof TextChannel)) return;
  
  const webhooks = await interaction.channel.fetchWebhooks()
  const webhook = webhooks.find(w => w.name === 'Meowhook🌸') as Webhook<WebhookType.Incoming>;
  const message = options.getString('message', true)
    .replace(/\\n/g, '\n')
    .replace(/\\\n/g, '\\n');
  
  const subCommand = options.getSubcommand(true);

  let avatarURL: string | undefined = undefined;
  if (subCommand === 'attachment') {
    const attachment = options.getAttachment('avatar', true);
    avatarURL = attachment.url;
  } else if (subCommand === 'url') {
    const url = options.getString('avatar', true);
    const isValidImageURL = async () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };
    if (!isValidImageURL()) {
      const errorEmbed = new EmbedBuilder({
        title: 'Invalid URL',
        description: `The provided URL for the avatar is not valid.\n${url}`,
        color: 0xff0000,
        footer: {
          text: `${interaction.user.username} | ${interaction.user.displayName}`,
          iconURL: interaction.user.displayAvatarURL()
        }
      });
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      return;
    }
    avatarURL = url;
  }

  await webhook.send({
    content: message,
    username: options.getString('displayname', true),
    avatarURL: avatarURL
  });

  await interaction.reply({ content: 'Message sent!', ephemeral: true });
  await interaction.deleteReply();
};

export default Command_Webhook;