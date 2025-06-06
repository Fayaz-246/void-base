import { StringSelectFileBuilder } from "../../classes/menuFile";

module.exports = new StringSelectFileBuilder()
  .setCustomId("menu_test")
  .setRun(async (interaction, args, client) => {
    await interaction.reply(interaction.values[0]);
  });
