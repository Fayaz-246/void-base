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
} from "../utils/exports";
import { SlashCommand } from "../interfaces/main";

export default class myClient extends Client {
  public interactions = new Collection<string, SlashCommand>();
  public buttons = new Collection();
  public menus: { string: Collection<any, any> } = {
    string: new Collection(),
  };

  public config = { embedColor: "#273051" };

  public caches = {
    interactions: new Map(),
    buttons: new Map(),
  };

  public utils = {
    getAllFiles,
    formatStr,
    filterObj,
    looselyCheck,
    delay,
    runSafe,
  };

  public logger = logger;

  public commandArray: ApplicationCommandDataResolvable[] = [];

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
          const handlerFiles = readdirSync(`${handler.path}/${handler.name}`);
          handlerFiles.forEach((file) => {
            const fileExec = require(path.join(handlerPath, file));
            if (typeof fileExec.default === "function") fileExec.default(this);
          });
        }
      });
    });
  }
}
