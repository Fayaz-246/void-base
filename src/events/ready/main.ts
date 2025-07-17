import myClient from "../../classes/client";
import slashCmdHandler from "../../handlers/interactions/slashCommands";

async function main(client: myClient) {
  client.logger.log("󱜙", `${client.user?.username} is online!`);

  await slashCmdHandler(client); // || Load the slash command handler

  client.logger.info(
    "󱜙",
    `Loaded ${client.application?.commands.cache.size} Slash Command(s), ${client.prefixCommands.size} Prefix Command(s), ${
      client.buttons.size
    } Button(s), ${client.modals.size} Modal(s) & ${Object.values(client.menus).reduce(
      (sum, col) => sum + col.size,
      0
    )} Menu(s)`
  );
}

export default main;
