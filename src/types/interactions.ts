import {
  AutocompleteInteraction,
  BitFieldResolvable,
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  ChatInputCommandInteraction,
  InteractionResponse,
  MessageFlags,
  MessageFlagsString,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
} from "discord.js";
import myClient from "../classes/client";

export type SlashCommandRunFunction = (
  interaction: ChatInputCommandInteraction,
  client: myClient
) => void | undefined | Promise<void | InteractionResponse<boolean> | undefined>;

export type AutoCompleteFunction = (
  interaction: AutocompleteInteraction,
  client?: myClient
) => void | Promise<void>;

export type InteractionFlags =
  | BitFieldResolvable<Extract<MessageFlagsString, "Ephemeral">, MessageFlags.Ephemeral>
  | undefined;

export type ComponentInteractions =
  | ButtonInteraction
  | ModalSubmitInteraction
  | StringSelectMenuInteraction
  | RoleSelectMenuInteraction
  | UserSelectMenuInteraction
  | ChannelSelectMenuInteraction;
