import 'dotenv/config';
import { Client } from 'discord.js';
import deployCommands from './deploy-commands';
import Command_Embed from './commands/embed';
import Command_Ping from './commands/ping';
import Command_Say from './commands/say';

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
      await Command_Embed(interaction);
    } else if (command === 'ping') {
      await Command_Ping(interaction);
    } else if (command === 'say') {
      await Command_Say(interaction);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);