import "dotenv/config";
import "./deploy-commands";
import { Client, Events, IntentsBitField } from "discord.js";
import Config, { getConfig } from "./resources/config";

import E_CommandInteraction from "./events/commandinteraction";
import E_ChannelCreate from "./events/channel/create";
import E_ChannelDelete from "./events/channel/delete";
import E_ChannelUpdate from "./events/channel/update";

(() => {
  var config: Config;

  console.clear();

  const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.MessageContent,
    ]
  });

  client.on(Events.ClientReady, async (c) => {
    console.log(`Logged in as ${c.user.username}`);
    config = await getConfig(c);
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.isCommand()) return;
    E_CommandInteraction(interaction, config);
  });

  client.on(Events.ChannelCreate, async (channel) => {
    E_ChannelCreate(config, channel);
  });

  client.on(Events.ChannelDelete, async (channel) => {
    if (channel.isDMBased()) return;
    E_ChannelDelete(config, channel);
  });

  client.on(Events.ChannelUpdate, async (old_channel, new_channel) => {
    if (old_channel.isDMBased()) return;
    if (new_channel.isDMBased()) return;
    E_ChannelUpdate(config, old_channel, new_channel);
  });

  client.login(process.env.DISCORD_TOKEN);
})();
