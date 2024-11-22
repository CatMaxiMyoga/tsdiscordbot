import { CacheType, CommandInteraction, EmbedBuilder, GuildMember } from "discord.js";
import commExecRestsJSON from './comm_exec_rest.json';


interface CommExecRests {
  [commandName: string]: {
    channels?: {
      type: 'whitelist' | 'blacklist';
      value: number[];
    };
    roles?: {
      type: 'whitelist' | 'blacklist';
      value: number[];
    };
  };
}

const commExecRests: CommExecRests = commExecRestsJSON as CommExecRests;
delete commExecRests.$schema

const executeCommand = async (
  interaction: CommandInteraction<CacheType>,
  func: (interaction: CommandInteraction<CacheType>) => Promise<void>
) => {
  const sendRestrictionEmbed = (error: "Channel" | "Role") => {
    const description = error === "Channel"
      ? "You can't use this command in this channel."
      : "You don't have the required role to use this command.";
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

  const restrictions = commExecRests[interaction.commandName];
  const channels = restrictions?.channels ? restrictions.channels : undefined;
  const roles = restrictions?.roles ? restrictions.roles : undefined;

  if (channels) {
    if (channels.type === 'whitelist') {
      if (!channels.value.includes(Number(interaction.channelId))) {
        return sendRestrictionEmbed("Channel");
      }
    } else if (channels.type === 'blacklist') {
      if (channels.value.includes(Number(interaction.channelId))) {
        return sendRestrictionEmbed("Channel");
      }
    }
  }

  if (roles) {
    if (!interaction.guild || !(interaction.member instanceof GuildMember)) {
      return sendRestrictionEmbed("Role");
    }
    const memberRoles = interaction.member.roles.cache.map(role => Number(role.id));
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

  await func(interaction);
}

export default executeCommand;