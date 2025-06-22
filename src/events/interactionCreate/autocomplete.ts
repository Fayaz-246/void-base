import { Interaction } from "discord.js";
import myClient from "../../classes/client";

export default async function runSlashCommandAutoComplete(
  client: myClient,
  interaction: Interaction
) {
  if (!interaction.isAutocomplete()) return;
  if (!interaction.guild) return await interaction.respond([{ name: "Disallowed", value: "n/a" }]);

  const command = client.interactions.get(interaction.commandName);
  if (!command || !command.autocomplete)
    return await interaction.respond([
      { name: "Autocomplete Code Not Written Yet.", value: "n/a" },
    ]);

  await client.utils.runSafe(
    interaction,
    async () => {
      await command.autocomplete?.(interaction, client);
    },
    "An error occurred while running this command."
  );
}
