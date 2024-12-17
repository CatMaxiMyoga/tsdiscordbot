import {Client, Snowflake, TextChannel} from "discord.js"
import Command from "./commandstype"
import commands from "./commands"

interface SavedItems {
  Channels: {
    Log: {
      ChannelCreate: TextChannel,
      ChannelDelete: TextChannel,
      ChannelUpdate: TextChannel
    }
  },
}

interface CommandRestrictions {
  [commandname: string]: {
    channels?: {
      type: "whitelist" | "blacklist",
      value: string[]
    },
    roles?: {
      type: "whitelist" | "blacklist",
      value: string[]
    }
  }
}

interface Config {
  commandRestrictions: CommandRestrictions,
  savedItems: SavedItems,
  commands: Command[]
}

const getConfig = async (client: Client<true>): Promise<Config> => {
  const gChannel = async (id: Snowflake) => {
    return (await client.channels.fetch(id))!;
  };
  const gTChannel = async (id: Snowflake) => {
    return (await gChannel(id)) as TextChannel;
  };
  
  return {
    commands: commands,
    commandRestrictions: {
      embed: {
        roles: {
          type: "whitelist",
          value: ["1237741325462405223"]
        }
      },
      say: {
        roles: {
          type: "whitelist",
          value: ["1053019464075063327"]
        }
      },
      webhook: {
        roles: {
          type: "whitelist",
          value: ["1237741850706837524"]
        }
      }
    },
    savedItems: {
      Channels: {
        Log: {
          ChannelCreate: await gTChannel("1237772022595977227"),
          ChannelUpdate: await gTChannel("1237788270901854238"),
          ChannelDelete: await gTChannel("1317230938404552784")
        }
      }
    }
  };
};

export default Config;
export { getConfig, CommandRestrictions, SavedItems };
