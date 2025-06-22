import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  InteractionResponse,
} from "discord.js";
import myClient from "../classes/client";

export type SlashCommandRunFunction = (
  interaction: ChatInputCommandInteraction,
  client: myClient
) =>
  | void
  | undefined
  | Promise<void | InteractionResponse<boolean> | undefined>;

export type AutoCompleteFunction = (
  interaction: AutocompleteInteraction,
  client?: myClient
) => void | Promise<void>;
