import {
  ApplicationCommandDataResolvable,
  ButtonInteraction,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
} from "discord.js";
import myClient from "../classes/client";

export interface SlashCommand {
  data: ApplicationCommandDataResolvable;
  run: (
    interaction: ChatInputCommandInteraction,
    client: myClient
  ) => void | Promise<void>;
}

export interface ButtonCommand {
  customId: string;
  run: (
    interaction: ButtonInteraction,
    args: string[] | undefined,
    client: myClient
  ) => void | Promise<void>;
}

export interface ModalSubmit {
  customId: string;
  run: (
    interaction: ModalSubmitInteraction,
    args: string[] | undefined,
    client: myClient
  ) => void | Promise<void>;
}
