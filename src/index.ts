import 'dotenv/config';
import { Client } from 'discord.js';
import executeCommand from './execute-command';
import deployCommands from './deploy-commands';
import Command_Embed from './commands/embed';
import Command_Ping from './commands/ping';
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
    if (command === 'embed') {
      await executeCommand(interaction, Command_Embed);
    } else if (command === 'ping') {
      await executeCommand(interaction, Command_Ping);
    } else if (command === 'say') {
      await executeCommand(interaction, Command_Say);
    } else if (command === 'webhook') {
      await executeCommand(interaction, Command_Webhook);
    } // TODO: purge
  }
});

client.login(process.env.DISCORD_TOKEN);