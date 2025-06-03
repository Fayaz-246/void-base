import chalk from "chalk";
import { readdirSync } from "fs";
import path from "path";
import clitable from "cli-table3";
import myClient from "../../classes/client";

async function sli(client: myClient) {
  const commandsDir = path.join(__dirname, "..", "..", "slashCommands");
  const folders = readdirSync(commandsDir);
  const table = new clitable({
    head: ["Command", "Category", "Status"],
    style: { head: ["whte"], border: ["gray"] },
    colWidths: [20, 20, 10],
  });

  const check = client.utils.loosleyCheck;

  for (const folder of folders) {
    const files = readdirSync(path.join(commandsDir, folder));
    for (const file of files) {
      const filepath = `../../slashCommands/${folder}/${file.slice(0, -3)}`;
      let command = require(filepath);
      command = command?.build?.();

      if (command?.data && command?.run) {
        client.interactions.set(
          command.data.name,
          Object.assign(command, { folder }),
        );
        client.commandArray.push(client.utils.filterObj(command.data));
        table.push([
          chalk.green(command.data.name),
          chalk.green(folder),
          chalk.green(""),
        ]);
      } else {
        console.log(chalk.yellow(`[WARN] ${file} is missing data or run()`));
        table.push([
          chalk.redBright(file),
          chalk.redBright(folder),
          chalk.redBright(""),
        ]);
      }
    }
  }

  if (!client.commandArray.length) {
    return console.log(
      chalk.redBright.bold.italic(
        "Aborting (/) registration: No commands found.",
      ),
    );
  }

  try {
    console.log(chalk.yellow("[󰇘] Fetching existing (/) commands..."));
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

    if (toDelete.size > 0) {
      console.log(
        chalk.redBright(`[] Deleting ${toDelete.size} stale command(s)...`),
      );
      for (const cmd of toDelete) {
        await client.application?.commands.delete(cmd.id);
        console.log(chalk.redBright(`  ↳ Deleted: ${cmd.name}`));
      }
    }
    const toRegister = [...newCommands, ...updatedCommands];
    if (toRegister.length === 0) {
      console.log(
        chalk.greenBright("[] No command changes. Skipping (/) registration."),
      );
    } else {
      console.log(
        chalk.yellow(
          `[󰇘] Registering ${toRegister.length} new/updated commands...`,
        ),
      );
      await client.application?.commands.set([
        ...client.commandArray, // send full clean state
      ]);
      console.log(
        chalk.greenBright(
          `[] Successfully refreshed ${toRegister.length} (/) commands.`,
        ),
      );
    }

    console.log(table.toString());
  } catch (err) {
    console.log(
      chalk.bgRedBright.whiteBright.bold(
        `Error during (/) registration: ${err}`,
      ),
    );
  }
}

export default sli;
