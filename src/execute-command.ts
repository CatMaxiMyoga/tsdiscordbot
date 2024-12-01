import { CacheType, CommandInteraction, EmbedBuilder, GuildMember } from "discord.js";
import Config from "./config";


const executeCommand = async (
  interaction: CommandInteraction<CacheType>,
  config: Config,
  func: (interaction: CommandInteraction<CacheType>, config: Config) => Promise<void>
) => {
  const commandRestrictions = config.commandRestrictions;

  const sendRestrictionEmbed = (error: "Channel" | "Role") => {
    const description = error === "Channel"
      ? "This command is not allowed in this channel."
      : "You are not authorized to use this command.";
    const embed = new EmbedBuilder({
      color: 0xff0000,
      title: `${error}-Restriction`,
      description: description,
      footer: {
        text: `${interaction.user.username} | ${interaction.user.displayName}`,
        iconURL: interaction.user.displayAvatarURL()
      }
    });
    interaction.reply({ embeds: [embed], ephemeral: true });
  };

  const restrictions = commandRestrictions[interaction.commandName];
  const channels = restrictions?.channels ? restrictions.channels : undefined;
  const roles = restrictions?.roles ? restrictions.roles : undefined;

  if (channels) {
    if (channels.type === 'whitelist') {
      if (!channels.value.includes(interaction.channelId)) {
        return sendRestrictionEmbed("Channel");
      }
    } else if (channels.type === 'blacklist') {
      if (channels.value.includes(interaction.channelId)) {
        return sendRestrictionEmbed("Channel");
      }
    }
  }

  if (roles) {
    if (!interaction.guild || !(interaction.member instanceof GuildMember)) {
      return sendRestrictionEmbed("Role");
    }
    const memberRoles = interaction.member.roles.cache.map(r => r.id);
    if (roles.type === 'whitelist') {
      if (!roles.value.some(role => memberRoles.includes(role))) {
        return sendRestrictionEmbed("Role");
      }
    } else if (roles.type === 'blacklist') {
      if (roles.value.some(role => memberRoles.includes(role))) {
        return sendRestrictionEmbed("Role");
      }
    }
  }

  await func(interaction, config);
}

export default executeCommand;