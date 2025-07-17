import { Client, Collection, ApplicationCommandData } from "discord.js";
import {
  ButtonCommand,
  ChannelSelect,
  ModalSubmit,
  RoleSelect,
  SlashCommand,
  StringSelect,
  UserSelect,
} from "../types/main";
import { BaseConfig } from "../config";
import TimedCache from "../lib/TimedCache";
import * as util from "../utils/exports";

export default interface IClient extends Client {
  interactions: Collection<string, SlashCommand>;
  buttons: Collection<string, ButtonCommand>;
  modals: Collection<string, ModalSubmit>;
  menus: {
    string: Collection<string, StringSelect>;
    user: Collection<string, UserSelect>;
    channel: Collection<string, ChannelSelect>;
    role: Collection<string, RoleSelect>;
  };

  config: BaseConfig;

  utils: typeof util.default;
  logger: typeof util.logger;

  commandArray: ApplicationCommandData[];
  autocompleteCommands: { name: string; lowerName: string }[];

  cache: TimedCache;
  replyCache: {
    interactions: TimedCache;
    prefix: TimedCache;
  };

  kill(): Promise<never>;
}
