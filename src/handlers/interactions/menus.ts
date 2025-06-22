import path from "path";
import myClient from "../../classes/client";
import baseHandler from "../../lib/baseHandler";

type menuType = "string" | "user" | "channel" | "role";

export default function menuHandler(client: myClient) {
  baseHandler(client, {
    type: "menus",
    rootDir: path.join(__dirname, "..", "..", "menus"),
    validateFolder: (folder) => {
      const lower = folder.toLowerCase();
      return ["string", "user", "channel", "role"].includes(lower);
    },
    onValidLoad: (client, folder, _file, loaded) => {
      const lower = folder.toLowerCase() as menuType;
      client.menus[lower].set(loaded.customId, Object.assign(loaded, { folder }));
    },
  });
}
