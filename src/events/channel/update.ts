import {
  APIEmbedField,
  CategoryChannel,
  EmbedBuilder,
  ForumChannel,
  NewsChannel,
  NonThreadGuildBasedChannel,
  StageChannel,
  TextChannel,
  VoiceChannel,
} from "discord.js";
import Config from "../../resources/config";

export default async (
  config: Config,
  old_channel: NonThreadGuildBasedChannel,
  new_channel: NonThreadGuildBasedChannel
) => {
  const fields: APIEmbedField[] = [];
  let description: string | undefined = undefined;

  if (old_channel.name !== new_channel.name) {
    fields.push({
      name: "Name",
      value: `${old_channel.name}\n${new_channel.name}`,
    });
  }
  if (!(old_channel instanceof CategoryChannel)) {
    if (old_channel.parent !== new_channel.parent) { fields.push({
      name: "Category",
      value:
        `${old_channel.parent?.name.toUpperCase() || "None"}` +
        `${new_channel.parent?.name.toUpperCase() || "None"}`,
    }); }
    description = `<#${new_channel.id}>`
  } 

  if (
    (old_channel instanceof TextChannel &&
      new_channel instanceof TextChannel) ||
    (old_channel instanceof NewsChannel &&
      new_channel instanceof NewsChannel) ||
    (old_channel instanceof ForumChannel &&
      new_channel instanceof ForumChannel)
  ) {
    if (Boolean(old_channel.topic) !== Boolean(new_channel.topic)) {
      fields.push({
        name: "Topic",
        value: `\`Old:\` ${old_channel.topic}\n\n\`New:\` ${new_channel.topic}`,
      });
    }

    if (old_channel.nsfw !== new_channel.nsfw) { fields.push({
      name: "NSFW",
      value: `${String(old_channel.nsfw)}\n${String(new_channel.nsfw)}`
    }); }

    if (old_channel.rateLimitPerUser !== new_channel.rateLimitPerUser) {
      let old_ratelimit = old_channel.rateLimitPerUser
        ? `${old_channel.rateLimitPerUser} seconds`
        : "Slowmode off";
      let new_ratelimit = new_channel.rateLimitPerUser
        ? `${new_channel.rateLimitPerUser} seconds`
        : "Slowmode off";
      fields.push({
        name: "Slowmode Cooldown",
        value: `${old_ratelimit}\n${new_ratelimit}`
      });
    }
  }

  if (
    (old_channel instanceof VoiceChannel &&
      new_channel instanceof VoiceChannel) ||
    (old_channel instanceof StageChannel &&
      new_channel instanceof StageChannel)
  ) {
    if (old_channel.bitrate !== new_channel.bitrate) { fields.push({
      name: "Bitrate",
      value:
        `${old_channel.bitrate / 1000} kb/s\n` +
        `${new_channel.bitrate / 1000} kb/s`
    }); }

    if (old_channel.userLimit !== new_channel.userLimit) { fields.push({
      name: "User Limit",
      value:
        `${old_channel.userLimit 
          ? `${old_channel.userLimit} users` : "No Limit"
        }\n${new_channel.userLimit
          ? `${new_channel.userLimit} users` : "No Limit"
        }`
    }); }
  }

  if (!fields.length) { return; }
  
  const embed = new EmbedBuilder({
    title: "Channel Updated",
    description: description,
    fields: fields,
    timestamp: new Date()
  });

  config.savedItems.Channels.Log.ChannelUpdate.send({ embeds: [embed] });
};
