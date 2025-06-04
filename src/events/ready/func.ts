import myClient from "../../classes/client";

async function log(client: myClient) {
  client.logger.log("󱜙", `${client.user?.username} is online!`);
}

export default log;
