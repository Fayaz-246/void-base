import {
  AutocompleteInteraction,
  BitFieldResolvable,
  ChatInputCommandInteraction,
  InteractionResponse,
  MessageFlags,
  MessageFlagsString,
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
