import chalk from "chalk";
import myClient from "../../classes/client";

async function log(client: myClient) {
  // console.log(`${client.user?.username} is online bois`);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(5000);
  console.log(chalk.magenta.bold(`[󱚣] ${client.user?.username} Is Online!`));
}

export default log;
