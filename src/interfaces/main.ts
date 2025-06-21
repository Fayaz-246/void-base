import {
  ApplicationCommandDataResolvable,
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
} from "discord.js";
import myClient from "../classes/client";
import { BaseComponentInteraction } from "./bases";

export interface SlashCommand {
  data: ApplicationCommandDataResolvable;
  run: (
    interaction: ChatInputCommandInteraction,
    client: myClient
  ) => void | Promise<void>;
  cached: boolean;
}

export type ButtonCommand = BaseComponentInteraction<ButtonInteraction>;
export type ModalSubmit = BaseComponentInteraction<ModalSubmitInteraction>;
export type StringSelect =
  BaseComponentInteraction<StringSelectMenuInteraction>;
export type RoleSelect = BaseComponentInteraction<RoleSelectMenuInteraction>;
export type UserSelect = BaseComponentInteraction<UserSelectMenuInteraction>;
export type ChannelSelect =
  BaseComponentInteraction<ChannelSelectMenuInteraction>;
