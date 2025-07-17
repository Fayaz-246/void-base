import {
  ApplicationCommandDataResolvable,
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
} from "discord.js";
import { BaseComponentInteraction } from "./bases";
import { AutoCompleteFunction, InteractionFlags, SlashCommandRunFunction } from "./interactions";
import { PrefixCommandData, PrefixCommandRun } from "./prefixCommands";

export interface SlashCommand {
  data: ApplicationCommandDataResolvable;
  run: SlashCommandRunFunction;
  cached: boolean;
  autocomplete?: AutoCompleteFunction;
  deferred?: boolean;
  deferFlags?: InteractionFlags;
}

export type ButtonCommand = BaseComponentInteraction<ButtonInteraction>;
export type ModalSubmit = BaseComponentInteraction<ModalSubmitInteraction>;
export type StringSelect = BaseComponentInteraction<StringSelectMenuInteraction>;
export type RoleSelect = BaseComponentInteraction<RoleSelectMenuInteraction>;
export type UserSelect = BaseComponentInteraction<UserSelectMenuInteraction>;
export type ChannelSelect = BaseComponentInteraction<ChannelSelectMenuInteraction>;

export interface PrefixCommand {
  data: PrefixCommandData;
  run: PrefixCommandRun;
}
