import { Interaction } from "discord.js";
import myClient from "../../classes/client";

async function runBtn(client: myClient, interaction: Interaction) {
  if (!interaction.isModalSubmit()) return;

  if (!interaction.guild) {
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "Modals can only be used in guilds",
        flags: 64,
      });
    }
    return;
  }

  const iModalId = interaction.customId;
  let args: string[] | undefined = iModalId.split("-") || undefined;
  const modal = client.modals.get(args[0]);

  if (!modal) {
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "Code not written for this modal yet",
        flags: 64,
      });
    }
    return;
  }

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
