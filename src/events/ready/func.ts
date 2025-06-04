import myClient from "../../classes/client";

async function log(client: myClient) {
  client.logger.log("󱜙", `${client.user?.username} is online!`);
  setTimeout(() => {
    console.log(client.tables.slashCommands);
    console.log(client.tables.buttons);
  }, 2_000);
}

export default log;
