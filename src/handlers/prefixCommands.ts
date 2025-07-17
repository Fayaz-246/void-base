import path from "path";
import * as fs from "fs/promises";
import myClient from "src/classes/client";

async function prefixCommandsHandler(client: myClient): Promise<void> {
  const cmdsDir = path.join(__dirname, "..", "commands", "prefix");
  const folders = await fs.readdir(cmdsDir);
  for (const folder of folders) {
    const files = await fs.readdir(path.join(cmdsDir, folder));
    for (const file of files) {
      const filepath = `../commands/prefix/${folder}/${file.slice(0, -3)}`;
      let command = await import(filepath);
      command = command?.default?.build?.();
      if (command?.data && command?.run) {
        client.prefixCommands.set(command.data.name, Object.assign(command, { folder }));
      } else {
        client.logger.warn("PREFIX CMDS", `${file} is missing data or run()`);
      }
    }
  }
}

export default prefixCommandsHandler;
