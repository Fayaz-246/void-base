import {
  Client,
  Partials,
  Collection,
  ApplicationCommandDataResolvable,
} from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import {
  getAllFiles,
  formatStr,
  filterObj,
  looselyCheck,
  runSafe,
  logger,
  delay,
  parseTimeToMs,
} from "../utils/exports";
import {
  ButtonCommand,
  ChannelSelect,
  ModalSubmit,
  RoleSelect,
  SlashCommand,
  StringSelect,
  UserSelect,
} from "../interfaces/main";
import TimedCache from "../lib/TimedCache";
import db from "../lib/db";
import cfg, { BaseConfig } from "../config";

export default class myClient extends Client {
  public interactions = new Collection<string, SlashCommand>();
  public buttons = new Collection<string, ButtonCommand>();
  public modals = new Collection<string, ModalSubmit>();
  public menus = {
    string: new Collection<string, StringSelect>(),
    user: new Collection<string, UserSelect>(),
    channel: new Collection<string, ChannelSelect>(),
    role: new Collection<string, RoleSelect>(),
  };

  public config: BaseConfig = cfg;

  public utils = {
    getAllFiles,
    formatStr,
    filterObj,
    looselyCheck,
    delay,
    runSafe,
    parseTimeToMs,
  };

  public logger = logger;

  public commandArray: ApplicationCommandDataResolvable[] = [];

  public tables: {
    slashCommands: string | null;
    buttons: string | null;
    modals: string | null;
    menus: string | null;
  } = { slashCommands: null, buttons: null, modals: null, menus: null };

  public cache = new TimedCache({
    name: "mainBotCache",
    defaultTTL: "5m",
  });

  public replyCache = new TimedCache({
    name: "commandRepliesCache",
    defaultTTL: "3m",
  });

  public db = db;

  constructor() {
    super({
      intents: ["Guilds", "GuildMessages", "GuildMembers"],
      partials: [Partials.User, Partials.GuildMember, Partials.Message],
    });

    this.start(process.env.TOKEN!);
  }

  private start(token: string) {
    const handlerFolder = readdirSync(path.join(__dirname, "..", "handlers"), {
      withFileTypes: true,
    });
    this.login(token).then(() => {
      handlerFolder.forEach((handler) => {
        const handlerPath = path.join(
          __dirname,
          "..",
          "handlers",
          handler.name
        );
        if (handler.isFile()) {
          const handlerFile = require(handlerPath);
          if (typeof handlerFile.default === "function")
            handlerFile.default(this);
        } else {
          const handlerFiles = readdirSync(
            `${path.join(__dirname, "..", "handlers")}/${handler.name}`
          );
          handlerFiles.forEach((file) => {
            const fileExec = require(path.join(handlerPath, file));
            if (typeof fileExec.default === "function") fileExec.default(this);
          });
        }
      });
    });
  }

  async kill() {
    this.removeAllListeners();
    await super.destroy();

    this.db.close();
  }
}
