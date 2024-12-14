import Config from '../config';
import {
  CommandInteraction,
  CacheType,
  CommandInteractionOptionResolver,
  TextChannel,
  EmbedBuilder
} from 'discord.js'

export default async (
  interaction: CommandInteraction<CacheType>,
  config: Config
) => {
  const options = interaction.options as CommandInteractionOptionResolver;
  const amount = options.getInteger('count', true) + 1;
  const twoWeeks = 1.21096e9;

  if (!(interaction.channel instanceof TextChannel)) { return; }

  await interaction.reply(`Deleting Messages...`);
  
  let remaining = amount;
  const allMessages = await interaction.channel.messages
    .fetch({ limit: Math.min(100, remaining) });
  const messages = [...allMessages.values()]
    .filter(m => !m.pinned)

  const bulkLoad = messages.filter(
    m => (Date.now() - m.createdTimestamp) < twoWeeks
  );
  const individualLoad = messages.filter(m => !bulkLoad.includes(m));

  if (bulkLoad.length > 0) {
    const bulkDeleted = await interaction.channel.bulkDelete(bulkLoad, true);
    remaining -= bulkDeleted.size;
  }

  for (const msg of individualLoad) {
    await msg.delete();
    remaining--;
  }

  const deleted = amount - remaining - 1;
  const description = deleted === 0
    ? '**No messages deleted.**'
    : `**Deleted ${deleted} messages.**`;

  const embed = new EmbedBuilder({
    color: 0xff8800,
    author: {
      name: interaction.user.displayName,
      iconURL: interaction.user.displayAvatarURL()
    },
    description: description,
    timestamp: Date.now()
  })

  const reply = await interaction.channel.send({ embeds: [embed] });
  setTimeout(() => reply.delete(), 5000);
};
