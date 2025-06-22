import { readdirSync } from "fs";
import path from "path";
import clitable from "cli-table3";
import myClient from "../classes/client";

const Colors = {
  Red: "\x1B[31m",
  Yellow: "\x1B[33m",
  Green: "\x1B[32m",
  Blue: "\x1B[34m",
  Purple: "\x1B[38;5;129m",
  Reset: "\x1B[0m",
};

interface BaseHandlerOptions {
  type: "buttons" | "modals" | "menus";
  rootDir?: string;
  validateFolder?: (folder: string) => boolean;
  onValidLoad?: (client: myClient, folder: string, file: string, built: any) => void;
}

export default function baseHandler(client: myClient, opts: BaseHandlerOptions) {
  const { type, rootDir, validateFolder, onValidLoad } = opts;

  const commandsDir = rootDir || path.join(__dirname, "..", type);
  const folders = readdirSync(commandsDir);

  const table = new clitable({
    head: [type[0].toUpperCase() + type.slice(1), "Category", "Status"],
    style: { head: ["white"], border: ["gray"] },
    colWidths: [20, 20, 10],
  });

  for (const folder of folders) {
    if (validateFolder && !validateFolder(folder)) {
      client.logger.error(type.toUpperCase(), `${folder} is invalid.`);
      continue;
    }

    const files = readdirSync(path.join(commandsDir, folder));
    for (const file of files) {
      let loaded = require(path.join(commandsDir, folder, file.slice(0, -3)));
      loaded = loaded?.build?.();

      if (loaded?.customId && loaded?.run) {
        if (onValidLoad) {
          onValidLoad(client, folder, file, loaded);
        }
        table.push([
          `${Colors.Green}${loaded.customId}${Colors.Reset}`,
          `${Colors.Green}${folder}${Colors.Reset}`,
          `${Colors.Green}${Colors.Reset}`,
        ]);
      } else {
        client.logger.warn(type.toUpperCase(), `${file} is missing customId or run()`);
        table.push([
          `${Colors.Red}${file}${Colors.Reset}`,
          `${Colors.Red}${folder}${Colors.Reset}`,
          `${Colors.Red}${Colors.Reset}`,
        ]);
      }
    }
  }

  client.tables[type] = table.toString();
}
