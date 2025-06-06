import {
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
} from "discord.js";
import { error } from "./logs";

/**
 * Safely runs a function with a slash command interaction,
 * and handles errors + interaction response status.
 */
export default async function runSafe(
  interaction:
    | ChatInputCommandInteraction
    | ButtonInteraction
    | ModalSubmitInteraction
    | StringSelectMenuInteraction
    | RoleSelectMenuInteraction
    | UserSelectMenuInteraction
    | ChannelSelectMenuInteraction,
  fn: () => Promise<void> | void,
  errorMessage = "An error occurred while executing this command."
) {
  try {
    await fn();
  } catch (err) {
    error(`runSafe Error`, `${err}`);

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
