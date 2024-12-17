enum OptionType {
  NONE = 0,
  SUB_COMMAND,
  SUB_COMMAND_GROUP,
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
  MENTIONABLE,
  NUMBER,
  ATTACHMENT
}

enum ChannelType {
  GUILD_TEXT = 0,
  DM,
  GUILD_VOICE,
  GROUP_DM,
  GUILD_CATEGORY,
  GUILD_ANNOUNCEMENT,
  ANNOUNCEMENT_THREAD = 10,
  PUBLIC_THREAD,
  PRIVATE_THREAD,
  GUILD_STAGE_VOICE,
  GUILD_DIRECTORY,
  GUILD_FORUM,
  GUILD_MEDIA
}

enum Context {
  GUILD = 0,
  BOT_DM,
  PRIVATE_CHANNEL
}

interface Option {
  type: OptionType,
  name: string,
  description: string,
};

interface SubCommandOption extends Option {
  type: OptionType.SUB_COMMAND,
  options?: Exclude<CommandOption, SubCommandGroupOption>[]
}

interface SubCommandGroupOption extends Option {
  type: OptionType.SUB_COMMAND_GROUP,
  options?: Exclude<Option, SubCommandGroupOption>[]
}

interface OptionParams extends Option {
  type: Exclude<
    OptionType, 
    OptionType.SUB_COMMAND | OptionType.SUB_COMMAND_GROUP
  >,
  required?: boolean
}

interface StringOption extends OptionParams {
  type: OptionType.STRING,
  choices?: { name: string, value: string }[],
  min_length?: number,
  max_length?: number
}

interface AnyNumberOption extends OptionParams {
  type: OptionType.INTEGER | OptionType.NUMBER,
  choices?: { name: string, value: number }[],
  min_value?: number,
  max_value?: number
}

interface ChannelOption extends OptionParams {
  type: OptionType.CHANNEL,
  channel_types?: ChannelType[]
}

type CommandOption = 
  OptionParams | StringOption | AnyNumberOption | ChannelOption;

type SubOption = SubCommandOption | SubCommandGroupOption

interface Command {
  name: string,
  description: string,
  options?: CommandOption[] | SubOption[],
  nsfw?: boolean,
  contexts: Context[]
}

export default Command;
export { OptionType, ChannelType, Context };
