import myClient from "../../classes/client";
import baseHandler from "../../lib/baseHandler";

async function buttonHandler(client: myClient) {
  baseHandler(client, {
    type: "buttons",
    onValidLoad: (client, folder, _file, loaded) => {
      client.buttons.set(loaded.customId, Object.assign(loaded, { folder }));
    },
  });
}

export default buttonHandler;
