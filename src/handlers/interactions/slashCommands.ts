import * as fs from "fs/promises";
import path from "path";
import myClient from "../../classes/client";
import { Colors } from "../../utils/logs";

async function slashCmdHandler(client: myClient) {
  const commandsDir = path.join(__dirname, "..", "..", "commands", "slash");
  const folders = await fs.readdir(commandsDir);

  const check = client.utils.looselyCheck;

  for (const folder of folders) {
    const files = await fs.readdir(path.join(commandsDir, folder));
    for (const file of files) {
      const filepath = `../../commands/slash/${folder}/${file.slice(0, -3)}`;
      let command = await import(filepath);
      command = command?.default?.build?.();

      if (command?.data && command?.run) {
        client.interactions.set(command.data.name, Object.assign(command, { folder }));
        client.commandArray.push(client.utils.filterObj(command.data));
      } else {
        client.logger.warn("SLASH CMDS", `${file} is missing data or run()`);
      }
    }
  }

  client.autocompleteCommands = client.commandArray.map((cmd) => ({
    name: cmd.name,
    lowerName: cmd.name.toLowerCase(),
  }));

  if (!client.commandArray.length) {
    return client.logger.error("SLASH CMDS", `Aborting (/) registration: No commands found.`);
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
      existing?.filter((cmd) => !localNames.includes(cmd.name)).map((cmd) => cmd) || [];

    if (toDelete.length > 0) {
      client.logger.error("", `Deleting ${toDelete.length} stale command(s)...`);
      for (const cmd of toDelete) {
        await client.application?.commands.delete(cmd.id);
        console.log(`${Colors.Red}  ↳ Deleted: ${cmd.name}${Colors.Reset}`);
      }
    }
    if (newCommands.length > 0) {
      client.logger.warn("󰇘", `Registering ${newCommands.length} new command(s)...`);
      for (const cmd of newCommands) {
        await client.application?.commands.create(cmd);
        console.log(`${Colors.Green}  ↳ Created: ${cmd.name}${Colors.Reset}`);
      }
    }

    if (updatedCommands.length > 0) {
      client.logger.warn("󰇘", `Updating ${updatedCommands.length} command(s)...`);
      for (const cmd of updatedCommands) {
        const existingCmd = existing?.find((e) => e.name === cmd.name);
        if (existingCmd) {
          await client.application?.commands.edit(existingCmd.id, cmd);
          console.log(`${Colors.Blue}  ↳ Updated: ${cmd.name}${Colors.Reset}`);
        }
      }
    }

    if (toDelete.length === 0 && newCommands.length === 0 && updatedCommands.length === 0) {
      client.logger.success("", "No command changes. Skipping (/) registration.");
    } else {
      client.logger.success("", `Successfully refreshed (/) commands.`);
    }
  } catch (err) {
    client.logger.error("SLASH CMDS", `Error during (/) registration: ${err}`);
  }
}

export default slashCmdHandler;
