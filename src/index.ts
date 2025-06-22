import "dotenv/config";

/*--------------------------------------*/
import Client from "./classes/client.js";
const client = new Client();
/*--------------------------------------*/

/*--------------------------------------*/
process.on("unhandledRejection", async (reason, promise) => {
  client.logger.error("NODE", `Unhandled Rejection @ ${promise}\n\nReason: ${reason}`);
});
process.on("uncaughtException", async (error) => {
  client.logger.error("NODE", `Uncaught Exception @ ${error.stack}`);
});
process.on("uncaughtExceptionMonitor", async (err, origin) => {
  client.logger.error("NODE", `Uncaught Exception Monitor :: ${err.stack} ${origin}`);
});
let exited = false;
process.on("SIGINT", async () => {
  if (exited) return;
  exited = true;
  client.logger.error("NODE", `Exiting Process...`);
  await client.kill();
});
process.on("SIGTERM", async () => {
  if (exited) return;
  exited = true;
  client.logger.warn("NODE", "Received SIGTERM, exiting...");
  await client.kill();
});
process.on("warning", (warning) => {
  client.logger.warn(
    "NODE",
    `Node Warning: ${warning.name} - ${warning.message}\n${warning.stack}`
  );
});
/*--------------------------------------*/
