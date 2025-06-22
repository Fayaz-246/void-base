import myClient from "../../classes/client";

async function log(client: myClient) {
  client.logger.log("󱜙", `${client.user?.username} is online!`);

  if (!client.config.logTables)
    return client.logger.info(
      "󱜙",
      `Loaded ${client.commandArray.length} Slash Command(s), ${
        client.buttons.size
      } Button(s), ${client.modals.size} Modal(s) & ${Object.values(client.menus).reduce(
        (sum, col) => sum + col.size,
        0
      )} Menu(s)`
    );

  setTimeout(() => {
    for (const key of Object.keys(client.tables) as (keyof typeof client.tables)[]) {
      console.log(client.tables[key]);
    }
  }, 2_000);
}

export default log;
