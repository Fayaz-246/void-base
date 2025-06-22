import { ApplicationCommandDataResolvable } from "discord.js";

export default function resolveCommandJSON(
  data: ApplicationCommandDataResolvable
): {
  name: string;
  description: string;
  [key: string]: any;
} {
  if (typeof data === "object" && "toJSON" in data) {
    return (data as any).toJSON();
  }
  return data as any;
}
