import Config from "../../resources/config";
import {
  APIEmbedField,
  ChannelType,
  EmbedBuilder,
  NonThreadGuildBasedChannel
} from "discord.js";

export default async (config: Config, channel: NonThreadGuildBasedChannel) => {
  const created = (() => {
    const unixTimestamp = Math.floor(channel.createdTimestamp / 1000);
    return `<t:${unixTimestamp}:R> | <t:${unixTimestamp}:f>`;
  })();

  const channelType = (() => {
    switch (channel.type) {
      case ChannelType.GuildText:
        return "Text";
      case ChannelType.GuildVoice:
        return "Voice";
      case ChannelType.GuildCategory:
        return "Category";
      case ChannelType.GuildAnnouncement:
        return "Announcement";
      case ChannelType.GuildStageVoice:
        return "Stage";
      case ChannelType.GuildForum:
        return "Forum";
      case ChannelType.GuildMedia:
        return "Media";
    }
  })();

  const name = channelType === 'Category' ? channel.name.toLowerCase() : channel.name;

  const info: APIEmbedField[] = [
    { name: "Name", value: name, inline: true },
    { name: "Created", value: created, inline: false },
  ];

  if (channelType !== "Category") {
    info.splice(1, 0, { name: "Type", value: channelType, inline: true });
  }

  if (channel.parent) {
    info.splice(0, 0, {
      name: "Category", value: channel.parent.name.toLowerCase(), inline: false
    });
  }

  const embed = new EmbedBuilder({
    color: 0x00aa00,
    title: channelType === "Category" ? "Category Created" : "Channel Created",
    description: channelType !== "Category" ? `<#${channel.id}>` : undefined,
    fields: info,
    timestamp: Date.now(),
  });

  await config.savedItems.Channels.Log.ChannelCreate.send({ embeds: [embed] });
};
