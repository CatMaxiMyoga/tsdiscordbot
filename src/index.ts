import 'dotenv/config';
import { Client } from 'discord.js';

const client = new Client({
  intents: [
    'Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'
  ]
})

client.on('ready', (c) => {
  console.log(`Logged in as ${c.user.username}`);
});

client.login(process.env.DISCORD_TOKEN);