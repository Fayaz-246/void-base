import myClient from "../../classes/client";
import baseHandler from "../../lib/baseHandler";

async function buttonHandler(client: myClient) {
  baseHandler(client, "buttons");
}

export default buttonHandler;
