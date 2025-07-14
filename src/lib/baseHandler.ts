import * as fs from "fs/promises";
import path from "path";
import myClient from "../classes/client";
import { Colors } from "../utils/logs";

interface BaseHandlerOptions {
  type: "buttons" | "modals" | "menus";
  rootDir?: string;
  validateFolder?: (folder: string) => boolean;
  onValidLoad?: (client: myClient, folder: string, file: string, built: any) => void;
}

export default async function baseHandler(
  client: myClient,
  opts: BaseHandlerOptions
): Promise<void> {
  const { type, rootDir, validateFolder, onValidLoad } = opts;

  const commandsDir = rootDir || path.join(__dirname, "..", "components", type);
  const folders = await fs.readdir(commandsDir);

  for (const folder of folders) {
    if (validateFolder && !validateFolder(folder)) {
      client.logger.error(type.toUpperCase(), `${folder} is invalid.`);
      continue;
    }

    const files = await fs.readdir(path.join(commandsDir, folder));
    for (const file of files) {
      let loaded = await import(path.join(commandsDir, folder, file.slice(0, -3)));
      loaded = loaded?.default?.build?.();

      if (loaded?.customId && loaded?.run) {
        if (onValidLoad) {
          onValidLoad(client, folder, file, loaded);
        }
      } else {
        client.logger.warn(type.toUpperCase(), `${file} is missing customId or run()`);
      }
    }
  }
}
