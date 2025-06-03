import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
} from "discord.js";
import myClient from "../classes/client";

export interface SlashCommand {
  data: ApplicationCommandDataResolvable;
  run: (
    interaction: ChatInputCommandInteraction,
    client: myClient,
  ) => void | Promise<void>;
}
