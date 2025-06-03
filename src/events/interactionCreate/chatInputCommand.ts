import { Interaction } from "discord.js";
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

  await client.utils.runSafe(
    interaction,
    async () => {
      await command.run(interaction, client);
    },
    "An error occurred while running this command.",
  );
}

export default runSlashCmd;
