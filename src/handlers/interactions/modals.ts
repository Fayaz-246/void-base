import myClient from "../../classes/client";
import baseHandler from "../../lib/baseHandler";

async function modalHandler(client: myClient) {
  baseHandler(client, {
    type: "modals",
    onValidLoad: (client, folder, _file, loaded) => {
      client.modals.set(loaded.customId, Object.assign(loaded, { folder }));
    },
  });
}

export default modalHandler;
