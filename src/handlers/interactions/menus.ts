import path from "path";
import myClient from "../../classes/client";
import { readdirSync } from "fs";
import clitable from "cli-table3";

const Colors = {
  Red: "\x1B[31m",
  Yellow: "\x1B[33m",
  Green: "\x1B[32m",
  Blue: "\x1B[34m",
  Purple: "\x1B[38;5;129m",
  Reset: "\x1B[0m",
};

type menuType = "string" | "user" | "channel" | "role";

async function menuHandler(client: myClient) {
  const commandsDir = path.join(__dirname, "..", "..", "menus");
  const folders = readdirSync(commandsDir);
  const table = new clitable({
    head: ["Menus", "Type", "Status"],
    style: { head: ["white"], border: ["gray"] },
    colWidths: [20, 20, 10],
  });

  for (const folder of folders) {
    const lower = folder.toLowerCase();
    if (!["string", "user", "channel", "role"].includes(lower))
      return client.logger.error(
        "MENUS",
        `${folder} folder name is invalid, it should only be the type of menu. I.e: String, User, Channel, or Role`
      );
    const files = readdirSync(path.join(commandsDir, folder));
    for (const file of files) {
      let menu = require(`../../menus/${folder}/${file.slice(0, -3)}`);
      menu = menu?.build?.();

      if (menu?.customId && menu?.run) {
        client.menus[lower as menuType].set(
          menu.customId,
          Object.assign(menu, { folder })
        );
        table.push([
          `${Colors.Green}${menu.customId}${Colors.Reset}`,
          `${Colors.Green}${folder}${Colors.Reset}`,
          `${Colors.Green}${Colors.Reset}`,
        ]);
      } else {
        client.logger.warn(`MENUS`, `${file} is missing customId or run()`);
        table.push([
          `${Colors.Red}${file}${Colors.Reset}`,
          `${Colors.Red}${folder}${Colors.Reset}`,
          `${Colors.Red}${Colors.Reset}`,
        ]);
      }
    }
  }

  client.tables.menus = table.toString();
}

export default menuHandler;
