import chalk from "chalk";
import { ChatInputCommandInteraction } from "discord.js";

/**
 * Safely runs a function with a slash command interaction,
 * and handles errors + interaction response status.
 */
export default async function runSafe(
  interaction: ChatInputCommandInteraction,
  fn: () => Promise<void> | void,
  errorMessage = "An error occurred while executing this command.",
) {
  try {
    await fn();
  } catch (err) {
    console.error(chalk.red(`[runSafe Error]`), err);

    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: errorMessage,
        flags: 64,
      });
    } else if (interaction.deferred && !interaction.replied) {
      await interaction.editReply({
        content: errorMessage,
      });
    }
  }
}
