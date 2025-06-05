import {
  ApplicationCommandDataResolvable,
  ButtonInteraction,
  ChatInputCommandInteraction,
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
    args: string[] | null,
    client: myClient
  ) => void | Promise<void>;
}
