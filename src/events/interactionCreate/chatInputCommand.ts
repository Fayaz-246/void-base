import {
  EmbedBuilder,
  Interaction,
  InteractionEditReplyOptions,
  InteractionReplyOptions,
  MessagePayload,
} from "discord.js";
import myClient from "../../classes/client";

async function runSlashCmd(client: myClient, interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  if (!(await client.utils.handleGuildCheck(client, interaction))) return;

  const command = client.interactions.get(interaction.commandName);

  if (!command) return await client.utils.handleNoCode(interaction);

  if (command.cached) {
    const canCache =
      interaction.options.data.length === 0 || interaction.options.data.every((opt) => !opt.value);

    if (canCache && client.replyCache.interactions.check(interaction.commandName)) {
      return await interaction.reply(client.replyCache.interactions.get(interaction.commandName));
    }

    if (canCache) {
      const ogReply = interaction.reply.bind(interaction);
      const ogEdit = interaction.editReply.bind(interaction);

      const saveToCache = (
        opts: string | MessagePayload | InteractionReplyOptions | InteractionEditReplyOptions
      ) => {
        client.replyCache.interactions.add(interaction.commandName, opts);
      };

      interaction.reply = (async (opts: string | MessagePayload | InteractionReplyOptions) => {
        saveToCache(opts);
        return await ogReply(opts);
      }) as typeof interaction.reply;

      interaction.editReply = (async (
        opts: string | MessagePayload | InteractionEditReplyOptions
      ) => {
        saveToCache(opts);
        return await ogEdit(opts);
      }) as typeof interaction.editReply;
    }
  }

  if (command.deferred && !interaction.deferred && !interaction.replied) {
    await interaction.deferReply({ flags: command.deferFlags });

    const ogEdit = interaction.editReply.bind(interaction);

    interaction.reply = (async (opts: string | MessagePayload | InteractionEditReplyOptions) => {
      interaction.replied = true;
      return await ogEdit(opts);
    }) as unknown as typeof interaction.reply;
  }

  // Run the actual command
  await client.utils.runSafe(
    interaction,
    async () => {
      await command.run(interaction, client);
    },
    "An error occurred while running this command."
  );
}

export default runSlashCmd;
