import { CacheType, CommandInteraction } from "discord.js";
import executeCommand from "../execute-command";
import Config from "../config";

import Command_Avatar from "../commands/avatar";
import Command_Embed from "../commands/embed";
import Command_Ping from "../commands/ping";
import Command_Purge from "../commands/purge";
import Command_Say from "../commands/say";
import Command_Webhook from "../commands/webhook";

export default async (
  config: Config,
  interaction: CommandInteraction<CacheType>
) => {
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
