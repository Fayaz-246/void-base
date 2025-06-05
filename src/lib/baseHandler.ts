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

export default function (client: myClient, type: "modals" | "buttons") {
  const commandsDir = path.join(__dirname, "..", `${type}`);
  const folders = readdirSync(commandsDir);
  const table = new clitable({
    head: [client.utils.formatStr(type), "Category", "Status"],
    style: { head: ["white"], border: ["gray"] },
    colWidths: [20, 20, 10],
  });

  for (const folder of folders) {
    const files = readdirSync(path.join(commandsDir, folder));
    for (const file of files) {
      let typeFile = require(`../${type}/${folder}/${file.slice(0, -3)}`);
      typeFile = typeFile?.build?.();

      if (typeFile?.customId && typeFile?.run) {
        client[type].set(
          typeFile.customId,
          Object.assign(typeFile, { folder })
        );
        table.push([
          `${Colors.Green}${typeFile.customId}${Colors.Reset}`,
          `${Colors.Green}${folder}${Colors.Reset}`,
          `${Colors.Green}${Colors.Reset}`,
        ]);
      } else {
        client.logger.warn(
          `${type.toUpperCase()}`,
          `${file} is missing customId or run()`
        );
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
