import "dotenv/config";

/*--------------------------------------*/
import Client from "./classes/client.js";
const client = new Client();
/*--------------------------------------*/

/*--------------------------------------*/
process.on("unhandledRejection", async (reason, promise) => {
  client.logger.error(
    "NODE",
    `Unhandled Rejection @ ${promise}\n\nReason: ${reason}`
  );
});
process.on("uncaughtException", async (error) => {
  client.logger.error("NODE", `Uncaught Exception @ ${error.stack}`);
});
process.on("uncaughtExceptionMonitor", async (err, origin) => {
  client.logger.error(
    "NODE",
    `Uncaught Exception Monitor :: ${err.stack} ${origin}`
  );
});
/*--------------------------------------*/
