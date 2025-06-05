import modalFileBuilder from "../../classes/modalFileBuilder";

module.exports = new modalFileBuilder()
  .setCustomId("test_modal")
  .setRun(async (interaction, args, client) => {
    const inp = await interaction.fields.getTextInputValue("input");
    await interaction.reply(`Input: ${inp}`);
  });
