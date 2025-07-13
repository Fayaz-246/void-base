import path from "path";
import { ClientEvents, Events } from "discord.js";
import myClient from "../classes/client";

type EventHandler = (client: myClient, ...args: any[]) => Promise<void> | void;

async function eventHandler(client: myClient): Promise<void> {
  const eventFolders = await client.utils.getAllFiles(path.join(__dirname, "..", "events"), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = await client.utils.getAllFiles(eventFolder);
    const eventName = path.basename(eventFolder);

    if (!eventName) continue;
    if (client.config.checkEventNames)
      if (!Object.values(Events).includes(eventName as Events))
        client.logger.warn("EVENT CHECKER", `${eventName} isn't a valid event.`);

    const loadedModules: EventHandler[] = [];
    for (const eventFile of eventFiles) {
      try {
        const eventModule = await import(eventFile);
        if (typeof eventModule.default === "function") {
          loadedModules.push(eventModule.default);
        } else {
          client.logger.warn("EVENTS", `${eventFile} does not export a default function.`);
        }
      } catch (err) {
        client.logger.error("EVENTS", `Failed to load ${eventFile}`);
        console.log(err);
      }
    }

    client.on(eventName as keyof ClientEvents, async (...args) => {
      for (const module of loadedModules) {
        await module(client, ...args);
      }
    });
  }
}

export default eventHandler;
