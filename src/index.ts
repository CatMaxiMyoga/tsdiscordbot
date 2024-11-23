import 'dotenv/config';
import { Client } from 'discord.js';
import executeCommand from './execute-command';
import deployCommands from './deploy-commands';
import Command_Avatar from './commands/avatar';
import Command_Embed from './commands/embed';
import Command_Ping from './commands/ping';
import Command_Purge from './commands/purge';
import Command_Say from './commands/say';
import Command_Webhook from './commands/webhook';


console.clear();

deployCommands();

const client = new Client({
  intents: [
    'Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'
  ]
});

client.on('ready', (c) => {
  console.log(`Logged in as ${c.user.username}`);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand() && interaction.isCommand()) {
    const command = interaction.commandName;

    switch (command) {
      case 'avatar':
        await executeCommand(interaction, Command_Avatar); break;
      case 'embed':
        await executeCommand(interaction, Command_Embed); break;
      case 'ping':
        await executeCommand(interaction, Command_Ping); break;
      case 'purge':
        await executeCommand(interaction, Command_Purge); break;
      case 'say':
        await executeCommand(interaction, Command_Say); break;
      case 'webhook':
        await executeCommand(interaction, Command_Webhook); break;
      default:
        console.error(`Unhandled command: ${command}`); break;
    }
  }
});

client.login(process.env.DISCORD_TOKEN);