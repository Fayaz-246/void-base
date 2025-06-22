import { Interaction } from "discord.js";
import myClient from "../../classes/client";

async function runBtn(client: myClient, interaction: Interaction) {
  if (!interaction.isModalSubmit()) return;

  if (!(await client.utils.handleGuildCheck(client, interaction))) return;

  const iModalId = interaction.customId;
  let args: string[] | undefined = iModalId.split("-") || undefined;
  const modal = client.modals.get(args[0]);

  if (!modal) return await client.utils.handleNoCode(interaction);

  await client.utils.runSafe(
    interaction,
    async () => {
      if (args != undefined && args.shift() == undefined) args = [];
      await modal.run(interaction, args, client);
    },
    "An error occurred while running this button."
  );
}

export default runBtn;
