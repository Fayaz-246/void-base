import { Interaction } from "discord.js";
import myClient from "../../classes/client";

async function runBtn(client: myClient, interaction: Interaction) {
  if (!interaction.isButton()) return;

  if (!(await client.utils.handleGuildCheck(client, interaction))) return;

  const iBtnID = interaction.customId;
  let args: string[] | undefined = iBtnID.split("-") || undefined;
  const button = client.buttons.get(args[0]);

  if (!button) return await client.utils.handleNoCode(interaction);

  await client.utils.runSafe(
    interaction,
    async () => {
      if (args != undefined && args.shift() == undefined) args = [];
      await button.run(interaction, args, client);
    },
    "An error occurred while running this button."
  );
}

export default runBtn;
