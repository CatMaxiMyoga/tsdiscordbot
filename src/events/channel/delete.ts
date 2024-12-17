import Config from "../../resources/config";
import {
  APIEmbedField,
  CategoryChannel,
  ChannelType,
  EmbedBuilder,
  NewsChannel,
  NonThreadGuildBasedChannel,
  TextChannel,
  VoiceChannel,
} from "discord.js";

export default async (config: Config, channel: NonThreadGuildBasedChannel) => {
  const created = (() => {
    const unixTimestamp = Math.floor(channel.createdTimestamp / 1000);
    return `<t:${unixTimestamp}:R> | <t:${unixTimestamp}:f>`;
  })();

  const deleted = (() => {
    const unixTimestamp = Math.floor(Date.now() / 1000);
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

  const name =
    channelType === "Category" ? channel.name.toLowerCase() : channel.name;

  const fields: APIEmbedField[] = [
    { name: "Name", value: name, inline: true },
    { name: "Created", value: created, inline: false },
    { name: "Deleted", value: deleted, inline: false },
  ];

  if (channelType !== "Category") {
    fields.splice(1, 0, { name: "Type", value: channelType, inline: true });
  }

  if (channel.parent) {
    fields.splice(0, 0, {
      name: "Category",
      value: channel.parent.name.toLowerCase(),
      inline: false,
    });
  }

  if (!(channel instanceof CategoryChannel)) {
    fields.splice(-2, 0, {
      name: "NSFW",
      value: channel.nsfw ? "Yes" : "No",
      inline: true,
    });
    if (!(channel instanceof VoiceChannel) && channel.topic) {
      fields.splice(-2, 0, {
        name: "Topic",
        value: channel.topic,
        inline: false,
      });
    }
  }

  if (channel instanceof TextChannel || channel instanceof NewsChannel) {
    fields.splice(-2, 0, {
      name: "Messages",
      value: channel.messages.cache.size.toString(),
      inline: true,
    });
  }

  const embed = new EmbedBuilder({
    color: 0xaa0000,
    title: channelType === "Category" ? "Category Deleted" : "Channel Deleted",
    fields: fields,
    timestamp: Date.now(),
  });

  await config.savedItems.Channels.Log.ChannelDelete.send({ embeds: [embed] });
};

