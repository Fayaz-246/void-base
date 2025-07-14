import myClient from "../classes/client";
import {
  ButtonInteraction,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
  ChannelSelectMenuInteraction,
} from "discord.js";
export type ComponentInteractions =
  | ButtonInteraction
  | ModalSubmitInteraction
  | StringSelectMenuInteraction
  | RoleSelectMenuInteraction
  | UserSelectMenuInteraction
  | ChannelSelectMenuInteraction;

export type baseComponentRun<T extends ComponentInteractions> = (
  interaction: T,
  args: string[] | undefined,
  client: myClient
) => void | Promise<void>;

export interface BaseComponentInteraction<T extends ComponentInteractions> {
  customId: string;
  run: baseComponentRun<T>;
}
