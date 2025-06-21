import { ColorResolvable } from "discord.js";

export interface BaseConfig {
  embedColor: ColorResolvable;
  verbose: boolean;
  checkEventNames: boolean;
  logTables: boolean;
}

const config: BaseConfig = {
  embedColor: "#3c32a8",
  verbose: true,
  checkEventNames: true,
  logTables: false,
};

export default config;
