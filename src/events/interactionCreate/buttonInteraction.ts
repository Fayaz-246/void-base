import { Interaction } from "discord.js";
import myClient from "../../classes/client";

async function runBtn(client: myClient, interaction: Interaction) {
  if (!interaction.isButton()) return;

  if (!interaction.guild) {
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "Buttons can only be used in guilds",
        flags: 64,
      });
    }
    return;
  }

  const iBtnID = interaction.customId;
  let args: string[] | null = iBtnID.split("*") || null;
  const button = client.buttons.get(args[0]);

  if (!button) {
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "Code not written for this button yet",
        flags: 64,
      });
    }
    return;
  }

  await client.utils.runSafe(
    interaction,
    async () => {
      if (args.shift() == undefined) args = null;
      await button.run(interaction, args, client);
    },
    "An error occurred while running this button."
  );
}

export default runBtn;
