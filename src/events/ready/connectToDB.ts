import myClient from "../../classes/client";
import Mongo from "mongoose";

async function DB(client: myClient) {
  const uri = process.env.MONGO_URI;
  if (!uri) return client.logger.error("DB", "Aborting DB connection, Invalid MONGO_URI in .env.");

  Mongo.connect(uri).then(() => {});

  const { connection } = Mongo;

  connection.on("connected", () => {
    client.logger.info("DB", "Connected to DB!");
  });

  connection.on("disconnected", () => {
    client.logger.warn("DB", "Disconnected from DB.");
  });

  connection.on("err", (err) => {
    client.logger.error("DB", `DB ERR: \n${err}`);
  });
}

export default DB;
