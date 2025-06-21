import {
  Interaction,
  InteractionReplyOptions,
  MessagePayload,
} from "discord.js";
import myClient from "../../classes/client";

async function runSlashCmd(client: myClient, interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  if (!interaction.guild) {
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "/ Commands can only be used in guilds",
        flags: 64,
      });
    }
    return;
  }

  const command = client.interactions.get(interaction.commandName);

  if (!command) {
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "Code not written for this (/) command yet",
        flags: 64,
      });
    }
    return;
  }

  if (command.cached) {
    if (!client.replyCache.check(interaction.commandName) == false) {
      const ogReply = interaction.reply.bind(interaction);

      interaction.reply = (async (
        opts: string | MessagePayload | InteractionReplyOptions
      ) => {
        client.replyCache.add(interaction.commandName, opts);

        return await ogReply(opts);
      }) as typeof interaction.reply;
    } else
      return await interaction.reply(
        client.replyCache.get(interaction.commandName)
      );
  }

  await client.utils.runSafe(
    interaction,
    async () => {
      await command.run(interaction, client);
    },
    "An error occurred while running this command."
  );
}

export default runSlashCmd;
