import { CommandInteraction, CacheType, Attachment, EmbedBuilder } from 'discord.js'

const Command_Embed = async (interaction: CommandInteraction<CacheType>) => {
  const ErrorEmbedBuilder = (error: string, errorInfo: string) => {
    return new EmbedBuilder({
      color: 0xff0000,
      title: error,
      description: errorInfo,
      footer: {
        text: `${interaction.user.username} | ${interaction.user.displayName}`,
        iconURL: interaction.user.displayAvatarURL()
      }
    });
  }

  const getStrArg = (arg: string): string | undefined => {
    return interaction.options.get(arg)?.value as string;
  }
  const getAttArg = (arg: string): Attachment | undefined => {
    return interaction.options.get(arg)?.attachment;
  }
  const arg_description = interaction.options.get('description')?.value as string;
  const arg_timestamp = interaction.options.get('timestamp')?.value as string;
  const arg_author = getStrArg('author');
  const arg_authorIconURL = getStrArg('authoriconurl');
  const arg_authorURL = getStrArg('authorurl');
  const arg_color = getStrArg('color');
  const arg_title = getStrArg('title');
  const arg_image = getAttArg('image');
  const arg_thumbnail = getAttArg('thumbnail');
  const arg_footer = getStrArg('footer');
  const arg_footerIconURL = getStrArg('footericonurl');
  const arg_customTimestamp = getStrArg('customtimestamp');

  const isValidURL = (url: string | undefined) => {
    if (url === undefined) { return true; }
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  const isValidImageURL = (url: string | undefined): Promise<boolean> => {
    if (url === undefined) {
      return new Promise(resolve => resolve(true));
    }
    if (!isValidURL(url)) {
      return new Promise((resolve) => resolve(false));
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const validateColor = (color: string | undefined) => {
    if (color === undefined) { return undefined; }
    try {
      const parsedColor = parseInt(color.slice(1), 16);
      return parsedColor;
    } catch (error) {
      return -1;
    }
  }

  const isValidDate = (date: string | undefined): boolean => {
    if (date === undefined) { return false; }

    const match = date.match(/^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/);
    if (!match) { return false; }

    const [_, day, month, year, hour, minute, second] = match.map(Number);
    const d = new Date(year, month - 1, day, hour, minute, second);

    return d.getFullYear() === year
      && d.getMonth() === month - 1
      && d.getDate() === day
      && d.getHours() === hour
      && d.getMinutes() === minute
      && d.getSeconds() === second;
  }

  const description = arg_description.replace(/\\n/g, '\n').replace(/\\\n/g, '\\n');
  const timestamp = arg_timestamp ? arg_timestamp in ['now', 'custom'] : false;
  const author = arg_author;
  const authorIconURL = await isValidImageURL(arg_authorIconURL) ? arg_authorIconURL : "";
  const authorURL = isValidURL(arg_authorURL) ? arg_authorURL : "";
  const color = validateColor(arg_color);
  const title = arg_title;
  const image = arg_image;
  const thumbnail = arg_thumbnail;
  const footer = arg_footer;
  const footerIconURL = await isValidImageURL(arg_footerIconURL) ? arg_footerIconURL : "";
  const customTimestamp = arg_customTimestamp;

  let embedTimestamp = new Date();

  if (arg_timestamp === 'custom') {
    if (!customTimestamp) {
      let errorEmbed = ErrorEmbedBuilder(
        "Missing Custom Timestamp",
        "When setting `timestamp` to `'custom'` you must provide a `customTimestamp`"
      )
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      return;
    }
    if (!isValidDate(customTimestamp)) {
      let errorEmbed = ErrorEmbedBuilder(
        "Invalid Custom Timestamp",
        "The timestamp you provided is invalid. It must be in the format 'dd/mm/YYYY HH:MM:SS'"
      )
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      return;
    }
    
    const [d, m, Y, H, M, S] = customTimestamp.split(/[\s:/-]+/).map(Number);
    embedTimestamp = new Date(Y, m - 1, d, H, M, S);
  }

  if (authorIconURL === "") {
    const errorEmbed = ErrorEmbedBuilder(
      "Invalid Author Icon URL",
      `The author icon URL you provided is invalid\n${arg_authorIconURL}`
    )
    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    return;
  }

  if (authorURL === "") {
    const errorEmbed = ErrorEmbedBuilder(
      "Invalid Author URL",
      `The author URL you provided is invalid\n${arg_authorURL}`
    )
    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    return;
  }

  if (color === -1) {
    const errorEmbed = ErrorEmbedBuilder(
      "Invalid Color",
      `The color you provided is invalid\n${arg_color}`
    )
    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    return;
  }

  if (footerIconURL === "") {
    const errorEmbed = ErrorEmbedBuilder(
      "Invalid Footer Icon URL",
      `The footer icon URL you provided is invalid\n${arg_footerIconURL}`
    )
    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    return;
  }

  const embed = new EmbedBuilder();

  if (description) { embed.setDescription(description); }
  if (timestamp) { embed.setTimestamp(embedTimestamp); }
  if (author) { embed.setAuthor({ name: author, iconURL: authorIconURL, url: authorURL }); }
  if (color) { embed.setColor(color); }
  if (title) { embed.setTitle(title); }
  if (image) { embed.setImage(image.url); }
  if (thumbnail) { embed.setThumbnail(thumbnail.url); }
  if (footer) { embed.setFooter({ text: footer, iconURL: footerIconURL }); }

  await interaction.reply({ embeds: [embed] });
};

export default Command_Embed;