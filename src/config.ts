import { Client, TextChannel } from 'discord.js';
import configJSON from './config.json';


interface SavedItems {
  Channels: {
    Log: {
      ChannelCreate: TextChannel;
      ChannelDelete: TextChannel;
    }
  }
}

interface CommandRestrictions {
  [commandName: string]: {
    channels?: {
      type: 'whitelist' | 'blacklist';
      value: string[];
    };
    roles?: {
      type: 'whitelist' | 'blacklist';
      value: string[];
    };
  };
}

interface Config {
  commandRestrictions: CommandRestrictions;
  savedItems: SavedItems;
}

const getConfig = async (client: Client<true>): Promise<Config> => {
  const getChannel = async (id: string) => {
    return (await client.channels.fetch(id))!;
  };
  const getTChannel = async (id: string) => await getChannel(id) as TextChannel;

  const ids = configJSON.savedIDs;

  const config: Config = {
    commandRestrictions: configJSON.commandRestrictions as CommandRestrictions,
    savedItems: {
      Channels: {
        Log: {
          ChannelCreate: await getTChannel(ids.Channels.Log.ChannelCreate),
          ChannelDelete: await getTChannel(ids.Channels.Log.ChannelDelete)
        }
      }
    }
  };

  return config;
}

export default Config;
export { SavedItems, CommandRestrictions, getConfig };