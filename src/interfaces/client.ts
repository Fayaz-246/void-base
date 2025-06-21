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

export interface SlashCommand {
  data: ApplicationCommandDataResolvable;
  run: (
    interaction: ChatInputCommandInteraction,
    client: myClient
  ) => void | Promise<void>;
  cached: boolean;
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

export interface StringSelect {
  customId: string;
  run: (
    interaction: StringSelectMenuInteraction,
    args: string[] | undefined,
    client: myClient
  ) => void | Promise<void>;
}

export interface RoleSelect {
  customId: string;
  run: (
    interaction: RoleSelectMenuInteraction,
    args: string[] | undefined,
    client: myClient
  ) => void | Promise<void>;
}

export interface UserSelect {
  customId: string;
  run: (
    interaction: UserSelectMenuInteraction,
    args: string[] | undefined,
    client: myClient
  ) => void | Promise<void>;
}

export interface ChannelSelect {
  customId: string;
  run: (
    interaction: ChannelSelectMenuInteraction,
    args: string[] | undefined,
    client: myClient
  ) => void | Promise<void>;
}
