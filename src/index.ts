import "dotenv/config";
import "./deploy-commands";
import { Client, Events, IntentsBitField } from "discord.js";
import executeCommand from "./execute-command";
import Config, { getConfig } from "./config";

import Command_Avatar from "./commands/avatar";
import Command_Embed from "./commands/embed";
import Command_Ping from "./commands/ping";
import Command_Purge from "./commands/purge";
import Command_Say from "./commands/say";
import Command_Webhook from "./commands/webhook";

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
    ],
  });

  client.on(Events.ClientReady, async (c) => {
    console.log(`Logged in as ${c.user.username}`);
    config = await getConfig(c);
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

  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isChatInputCommand() && interaction.isCommand()) {
      const command = interaction.commandName;

      switch (command) {
        case "avatar":
          await executeCommand(interaction, config, Command_Avatar);
          break;
        case "embed":
          await executeCommand(interaction, config, Command_Embed);
          break;
        case "ping":
          await executeCommand(interaction, config, Command_Ping);
          break;
        case "purge":
          await executeCommand(interaction, config, Command_Purge);
          break;
        case "say":
          await executeCommand(interaction, config, Command_Say);
          break;
        case "webhook":
          await executeCommand(interaction, config, Command_Webhook);
          break;
        default:
          console.error(`Unhandled command: ${command}`);
          break;
      }
    }
  });

  client.login(process.env.DISCORD_TOKEN);
})();
