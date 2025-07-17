import { ColorResolvable } from "discord.js";

export interface BaseConfig {
  embedColor: ColorResolvable; // Default embed color
  errorColor: ColorResolvable; // Embed color for errors
  warnColor: ColorResolvable; // Embed color for warning messages
  successColor: ColorResolvable; // Embed color for success responses
  verbose: boolean; // Log every interaction
  checkEventNames: boolean; // Check if the events in src/events are valid
  requireGuildOnly: boolean; // Make all interactions & components only usable in guilds
  prefix: string;
}

const config: BaseConfig = {
  embedColor: "#3c32a8",
  errorColor: "#ed4242",
  warnColor: "#ebd534",
  successColor: "#42ed4b",
  verbose: true,
  checkEventNames: true,
  requireGuildOnly: true,
  prefix: "?",
};

export default config;
