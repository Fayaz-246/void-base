import {
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
} from "discord.js";
import { error, info } from "./logs";
import config from "../config";

type SupportedInteractions =
  | ChatInputCommandInteraction
  | ButtonInteraction
  | ModalSubmitInteraction
  | StringSelectMenuInteraction
  | RoleSelectMenuInteraction
  | UserSelectMenuInteraction
  | ChannelSelectMenuInteraction;

function getInteractionDetails(interaction: SupportedInteractions): {
  type: string;
  name: string;
} {
  if ("commandName" in interaction)
    return { type: "Slash Command", name: interaction.commandName };
  if ("customId" in interaction)
    return { type: getTypeName(interaction), name: interaction.customId };
  return { type: "Unknown", name: "N/A" };
}

function getTypeName(
  interaction: Exclude<SupportedInteractions, ChatInputCommandInteraction>
) {
  if (interaction.isButton()) return "Button";
  if (interaction.isModalSubmit()) return "Modal";
  if (interaction.isStringSelectMenu()) return "String Select";
  if (interaction.isRoleSelectMenu()) return "Role Select";
  if (interaction.isUserSelectMenu()) return "User Select";
  if (interaction.isChannelSelectMenu()) return "Channel Select";
  return "Unknown";
}

export default async function runSafe(
  interaction: SupportedInteractions,
  fn: () => Promise<void> | void,
  errorMessage = "An error occurred while executing this command."
) {
  const { type, name } = getInteractionDetails(interaction);
  if (config.verbose)
    info(
      `${type} Run`,
      `Name: ${name} || Interaction-ID: ${interaction.id} | User-ID: ${interaction.user.id} | Guild-ID: ${interaction.guildId}`
    );

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
