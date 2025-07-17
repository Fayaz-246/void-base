import {
  EmbedBuilder,
  Message,
  MessageEditOptions,
  MessagePayload,
  MessageReplyOptions,
} from "discord.js";
import uClient from "../../classes/client";

async function prefixCommands(client: uClient, message: Message) {
  if (!message.content.startsWith(client.prefix)) return;
  if (message.author.bot) return;

  const args = message.content.split(" ");
  args[0] = args[0].slice(1);
  if (args[0] == "") return;

  if (client.config.requireGuildOnly && !message.guild) {
    const guildCheckErrorEmbed = new EmbedBuilder()
      .setColor(client.config.errorColor)
      .setTimestamp()
      .setTitle("❌ Disallowed")
      .setDescription(`**You can only use this command in a guild.**`);

    await message.reply({
      embeds: [guildCheckErrorEmbed],
    });
    return;
  }

  const cmdName = args.shift();
  if (!cmdName) return;
  const command = client.prefixCommands.get(cmdName);
  if (!command) return;

  if (command.data.cached) {
    if (client.replyCache.prefix.check(cmdName)) {
      return await message.reply(client.replyCache.prefix.get(cmdName));
    }

    const ogReply = message.reply.bind(message);
    const ogEdit = message.edit.bind(message);

    const saveToCache = (
      opts: string | MessagePayload | MessageReplyOptions | MessageEditOptions
    ) => {
      client.replyCache.prefix.add(cmdName, opts);
    };

    message.reply = (async (opts: string | MessagePayload | MessageReplyOptions) => {
      saveToCache(opts);
      return await ogReply(opts);
    }) as typeof message.reply;

    message.edit = (async (opts: string | MessagePayload | MessageEditOptions) => {
      saveToCache(opts);
      return await ogEdit(opts);
    }) as typeof message.edit;
  }

  try {
    if (client.config.requireGuildOnly && !message.guild) return;
    await command.run(message, args, client);
    if (client.config.verbose)
      client.logger.info(
        "PREFIX RUN",
        `Name - ${cmdName} | Message ID: ${message.id} | User ID: ${message.author.id} | Guild ID: ${message.guild ? message.guild.id : "n/a"}`
      );
  } catch (error) {
    client.logger.error("PREFIX", `Error occured: ${(error as Error).message}`);
  }
}

export default prefixCommands;
