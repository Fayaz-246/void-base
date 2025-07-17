import { Message } from "discord.js";
import myClient from "src/classes/client";

export type PrefixCommandRun = (
  message: Message,
  args: string[] | null,
  client: myClient
) => void | Promise<void>;

export interface PrefixCommandData {
  name: string;
  aliases: string[];
  cached: boolean;
}
