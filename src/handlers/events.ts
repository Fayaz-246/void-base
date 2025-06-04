import path from "path";
import { ClientEvents } from "discord.js";
import myClient from "../classes/client";

function eventHandler(client: myClient): void {
  const eventFolders = client.utils.getAllFiles(
    path.join(__dirname, "..", "events"),
    true
  );

  for (const eventFolder of eventFolders) {
    const eventFiles = client.utils.getAllFiles(eventFolder);
    const eventName = path.basename(eventFolder);

    if (!eventName) continue;

    client.on(eventName as keyof ClientEvents, async (...args) => {
      for (const eventFile of eventFiles) {
        try {
          const eventModule = await import(eventFile);
          if (typeof eventModule.default === "function") {
            await eventModule.default(client, ...args);
          } else {
            client.logger.warn(
              "EVENTS",
              `${eventFile} does not export a default function.`
            );
          }
        } catch (err) {
          client.logger.error("EVENTS", `Failed to load ${eventFile}`);
          console.log(err);
        }
      }
    });
  }
}

export default eventHandler;
