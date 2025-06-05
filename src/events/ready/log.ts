import myClient from "../../classes/client";

async function log(client: myClient) {
  client.logger.log("󱜙", `${client.user?.username} is online!`);
  setTimeout(() => {
    for (const key of Object.keys(
      client.tables
    ) as (keyof typeof client.tables)[]) {
      console.log(client.tables[key]);
    }
  }, 2_000);
}

export default log;
