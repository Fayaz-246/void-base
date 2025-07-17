import { Client, Partials, Collection, ApplicationCommandData } from "discord.js";
import * as fs from "fs/promises";
import path from "path";
import util, { logger } from "../utils/exports";
import {
  ButtonCommand,
  ChannelSelect,
  ModalSubmit,
  PrefixCommand,
  RoleSelect,
  SlashCommand,
  StringSelect,
  UserSelect,
} from "../types/main";
import TimedCache from "../lib/TimedCache";
import cfg, { BaseConfig } from "../config";
import IClient from "../types/client";

export default class myClient extends Client implements IClient {
  public interactions = new Collection<string, SlashCommand>();
  public buttons = new Collection<string, ButtonCommand>();
  public modals = new Collection<string, ModalSubmit>();
  public menus = {
    string: new Collection<string, StringSelect>(),
    user: new Collection<string, UserSelect>(),
    channel: new Collection<string, ChannelSelect>(),
    role: new Collection<string, RoleSelect>(),
  };
  public prefixCommands = new Collection<string, PrefixCommand>();

  public config: BaseConfig = cfg;
  public prefix: string = this.config.prefix;

  public utils = util;

  public logger = logger;

  public commandArray: ApplicationCommandData[] = [];
  public autocompleteCommands: { name: string; lowerName: string }[] = [];

  public cache = new TimedCache({
    name: "mainBotCache",
    defaultTTL: "5m",
  });

  public replyCache = {
    interactions: new TimedCache({
      name: "interactionReplyCache",
      defaultTTL: "10m",
    }),
    prefix: new TimedCache({
      name: "prefixReplyCache",
      defaultTTL: "10m",
    }),
  };

  constructor() {
    super({
      intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
      partials: [Partials.User, Partials.GuildMember, Partials.Message],
    });

    if (!process.env.TOKEN) {
      this.logger.error("TOKEN", 'No "TOKEN" in .env file');
      process.exit(1);
    }

    this.start(process.env.TOKEN!);
  }

  private async start(token: string) {
    const handlerFolders = await fs.readdir(path.join(__dirname, "..", "handlers"), {
      withFileTypes: true,
    });

    for (const handlerFolder of handlerFolders) {
      const handlerPath = path.join(__dirname, "..", "handlers", handlerFolder.name);

      if (handlerFolder.isFile()) {
        const handlerModule = await import(handlerPath);
        if (typeof handlerModule.default === "function") {
          await handlerModule.default(this);
        }
      } else if (handlerFolder.isDirectory()) {
        const handlerFiles = await fs.readdir(handlerPath);
        for (const file of handlerFiles) {
          if (file === "slashCommands.ts") continue; // Skip slashCommands.ts, only loading after client is logged in

          const filePath = path.join(handlerPath, file);
          const handlerModule = await import(filePath);
          if (typeof handlerModule.default === "function") {
            await handlerModule.default(this);
          }
        }
      }
    }

    await this.login(token);
  }

  async kill(): Promise<never> {
    this.removeAllListeners();
    await super.destroy();
    process.exit(0);
  }
}
