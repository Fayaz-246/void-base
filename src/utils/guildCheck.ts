import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Interaction,
  ModalSubmitInteraction,
} from "discord.js";
import myClient from "../classes/client";

type SupportedInteractions =
  | Interaction
  | ChatInputCommandInteraction
  | ButtonInteraction
  | ModalSubmitInteraction
  | AnySelectMenuInteraction;

export default function guildCheck(client: myClient, interaction: SupportedInteractions): boolean {
  if (!client.config.requireGuildOnly) return true;

  const inGuild = !!interaction.guild;
  if (!inGuild && client.config.verbose) {
    client.logger.warn(
      "GUARD",
      `Blocked interaction in DM: ${interaction.user?.tag} || UID: ${interaction.user?.id}`
    );
  }

  return inGuild;
}
