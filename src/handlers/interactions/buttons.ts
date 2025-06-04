import { readdirSync } from "fs";
import path from "path";
import clitable from "cli-table3";
import myClient from "../../classes/client";

const Colors = {
  Red: "\x1B[31m",
  Yellow: "\x1B[33m",
  Green: "\x1B[32m",
  Blue: "\x1B[34m",
  Purple: "\x1B[38;5;129m",
  Reset: "\x1B[0m",
};

async function btni(client: myClient) {
  const commandsDir = path.join(__dirname, "..", "..", "buttons");
  const folders = readdirSync(commandsDir);
  const table = new clitable({
    head: ["Button", "Category", "Status"],
    style: { head: ["white"], border: ["gray"] },
    colWidths: [20, 20, 10],
  });

  for (const folder of folders) {
    const files = readdirSync(path.join(commandsDir, folder));
    for (const file of files) {
      const filepath = `../../buttons/${folder}/${file.slice(0, -3)}`;
      let button = require(filepath);
      button = button?.build?.();

      if (button?.name && button?.run) {
        client.buttons.set(button.name, Object.assign(button, { folder }));
        table.push([
          `${Colors.Green}${button.name}${Colors.Reset}`,
          `${Colors.Green}${folder}${Colors.Reset}`,
          `${Colors.Green}${Colors.Reset}`,
        ]);
      } else {
        client.logger.warn("BUTTONS", `${file} is missing name or run()`);
        table.push([
          `${Colors.Red}${file}${Colors.Reset}`,
          `${Colors.Red}${folder}${Colors.Reset}`,
          `${Colors.Red}${Colors.Reset}`,
        ]);
      }
    }
  }

  client.tables.buttons = table.toString();
}

export default btni;
