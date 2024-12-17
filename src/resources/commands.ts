import Command, {Context, OptionType} from "./commandstype";

const commands: Command[] = [
  {
    name: "avatar",
    description: "Get the avatar of a user or yourself",
    options: [
      {
        name: "user",
        description: 
          "The user whose avatar you wanna get. Leave empty for yourself",
        type: OptionType.USER,
        required: false
      }
    ], contexts: [Context.GUILD]
  }, {
    name: "embed",
    description: "Make the bot send an embed",
    options: [
      {
        name: "description",
        description:
          "'\\n' for newline. '\\\\n' for '\\n' in the text. The " +
          "description of the embed",
        type: OptionType.STRING,
        required: true,
        min_length: 1,
        max_length: 4096
      }, {
        name: "timestamp",
        description: "Show the timestamp on the embed.",
        type: OptionType.STRING,
        required: true,
        choices: [
          { name: "None", value: "false" },
          { name: "Current Time", value: "now" },
          { name: "Custom Time", value: "custom" }
        ]
      }, {
        name: "author",
        description: "The author of the embed",
        type: OptionType.STRING,
        required: false,
        min_length: 1,
        max_length: 256
      }, {
        name: "authoricon",
        description: "The author's icon on the embed",
        type: OptionType.ATTACHMENT,
        required: false
      }, {
        name: "authorurl",
        description: "The author's url on the embed",
        type: OptionType.STRING,
        required: false,
        min_length: 10
      }, {
        name: "color",
        description: "The color of the embed in hex (#rrggbb)",
        type: OptionType.STRING,
        required: false,
        min_length: 7,
        max_length: 7
      }, {
        name: "title",
        description: "The title of the embed",
        type: OptionType.STRING,
        required: false,
        min_length: 1,
        max_length: 256
      }, {
        name: "image",
        description: "The image on the embed",
        type: OptionType.ATTACHMENT,
        required: false
      }, {
        name: "thumbnail",
        description: "The thumbnail on the embed",
        type: OptionType.ATTACHMENT,
        required: false
      }, {
        name: "footer",
        description: "The footer text on the embed",
        type: OptionType.STRING,
        required: false,
        min_length: 1,
        max_length: 2048
      }, {
        name: "footericon",
        description: "The footer icon on the embed",
        type: OptionType.ATTACHMENT,
        required: false
      }, {
        name: "customtimestamp",
        description: "Custom Timestamp in 'dd/mm/yyyy hh:mm:ss' format",
        type: OptionType.STRING,
        required: false,
        min_length: 19,
        max_length: 19
      }
    ], contexts: [Context.GUILD]
  }, {
    name: "ping",
    description: "Replies with 'pong' and the latency of the bot",
    contexts: [Context.GUILD]
  }, {
    name: "purge",
    description: "Clears a specified amount of messages from the channel.",
    options: [
      {
        name: "count",
        description: "The amount of messages to delete. Ignores pinned.",
        type: OptionType.INTEGER,
        required: true,
        min_value: 1,
        max_value: 100
      }
    ], contexts: [Context.GUILD]
  }, {
    name: "say",
    description: "Make the bot say something",
    options: [
      {
        name: "message",
        description:
          "'\\n' for newline. '\\\\n' for '\\n' in the text. The message " +
            "to say",
        type: OptionType.STRING,
        required: true,
        min_length: 5
      }
    ], contexts: [Context.GUILD]
  }, {
    name: "webhook",
    description: "Irrelevant",
    options: [
      {
        name: "attachment",
        description:
          "Make the bot say something using a customizable webhook! " +
          "Uses an attachment for the avatar.",
        type: OptionType.SUB_COMMAND,
        options: [
          {
            name: "avatar",
            description: "The avatar of the webhook",
            type: OptionType.ATTACHMENT,
            required: true
          }, {
            name: "displayname",
            description: "The display name of the webhook",
            type: OptionType.STRING,
            required: true
          }, {
            name: "message",
            description:
              "'\\n' for newline. '\\\\n' for '\\n' in the text. The " +
              "message to send",
            type: OptionType.STRING,
            required: true
          }
        ]
      }, {
        name: "url",
        description:
          "Make the bot say something using a customizable webhook! " +
          "Uses a url for the avatar.",
        type: OptionType.SUB_COMMAND,
        options: [
          {
            name: "avatar",
            description: "The avatar of the webhook",
            type: OptionType.STRING,
            required: true
          }, {
            name: "displayname",
            description: "The display name of the webhook",
            type: OptionType.STRING,
            required: true
          }, {
            name: "message",
            description:
              "'\\n' for newline. '\\\\n' for '\\n' in the text. The " +
              "message to send",
            type: OptionType.STRING,
            required: true
          }
        ]
      }
    ], contexts: [Context.GUILD]
  }
];

export default commands;
