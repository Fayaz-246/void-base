import myClient from "../../classes/client";
import baseHandler from "../../lib/baseHandler";

async function modalHandler(client: myClient) {
  baseHandler(client, "modals");
}

export default modalHandler;
