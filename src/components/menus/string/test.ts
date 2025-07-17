import { StringSelectFileBuilder } from "@builders/menuFileBuilder";

export default new StringSelectFileBuilder()
  .setCustomId("menu_test")
  .setRun(async (interaction, args, client) => {
    await interaction.reply(interaction.values[0]);
  });
