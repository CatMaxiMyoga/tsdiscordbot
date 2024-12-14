import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import * as dotenv from 'dotenv';
import commandsJSON from './commands.json';

dotenv.config();

interface Option {
  name: string;
  description: string;
  type: number;
  required?: boolean;
  choices?: { name: string; value: string | number }[];
  options?: Option[];
}

interface Command {
  name: string;
  description: string;
  options?: Option[];
}

interface CommandsJSON {
  commands: Command[]
}

const commands: Command[] = (commandsJSON as unknown as CommandsJSON).commands;

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
