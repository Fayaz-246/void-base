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

async function sli(client: myClient) {
  const commandsDir = path.join(__dirname, "..", "..", "slashCommands");
  const folders = readdirSync(commandsDir);
  const table = new clitable({
    head: ["Command", "Category", "Status"],
    style: { head: ["white"], border: ["gray"] },
    colWidths: [20, 20, 10],
  });

  const check = client.utils.looselyCheck;

  for (const folder of folders) {
    const files = readdirSync(path.join(commandsDir, folder));
    for (const file of files) {
      const filepath = `../../slashCommands/${folder}/${file.slice(0, -3)}`;
      let command = require(filepath);
      command = command?.build?.();

      if (command?.data && command?.run) {
        client.interactions.set(
          command.data.name,
          Object.assign(command, { folder })
        );
        client.commandArray.push(client.utils.filterObj(command.data));
        table.push([
          `${Colors.Green}${command.data.name}${Colors.Reset}`,
          `${Colors.Green}${folder}${Colors.Reset}`,
          `${Colors.Green}${Colors.Reset}`,
        ]);
      } else {
        client.logger.warn("SLASH CMDS", `${file} is missing data or run()`);
        table.push([
          `${Colors.Red}${file}${Colors.Reset}`,
          `${Colors.Red}${folder}${Colors.Reset}`,
          `${Colors.Red}${Colors.Reset}`,
        ]);
      }
    }
  }

  if (!client.commandArray.length) {
    return client.logger.error(
      "SLASH CMDS",
      `Aborting (/) registration: No commands found.`
    );
  }

  try {
    client.logger.warn("󰇘", "Fetching existing (/) commands...");
    const existing = await client.application?.commands.fetch();
    const localNames = client.commandArray.map((cmd) => cmd.name);
    const newCommands = [];
    const updatedCommands = [];

    for (const localCmd of client.commandArray) {
      const existingCmd = existing?.find((cmd) => cmd.name === localCmd.name);
      if (!existingCmd) {
        newCommands.push(localCmd);
      } else {
        if (!check(localCmd, existingCmd.toJSON())) {
          updatedCommands.push(localCmd);
        }
      }
    }

    const toDelete =
      existing
        ?.filter((cmd) => !localNames.includes(cmd.name))
        .map((cmd) => cmd) || [];

    if (toDelete.length > 0) {
      client.logger.error(
        "",
        `Deleting ${toDelete.length} stale command(s)...`
      );
      for (const cmd of toDelete) {
        await client.application?.commands.delete(cmd.id);
        console.log(`${Colors.Red}  ↳ Deleted: ${cmd.name}${Colors.Reset}`);
      }
    }
    const toRegister = [...newCommands, ...updatedCommands];
    if (toRegister.length === 0) {
      client.logger.success(
        "",
        "No command changes. Skipping (/) registration."
      );
    } else {
      client.logger.warn("󰇘", `${toRegister.length} new/updated commands...`);
      await client.application?.commands.set([
        ...client.commandArray, // send full clean state
      ]);
      client.logger.success(
        "",
        `Successfully refreshed ${toRegister.length} (/) commands.`
      );
    }

    console.log(table.toString());
  } catch (err) {
    client.logger.error("SLASH CMDS", `Error during (/) registration: ${err}`);
  }
}

export default sli;
