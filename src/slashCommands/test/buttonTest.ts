import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import InteractionBuilder from "../../classes/interactionBuilder";

module.exports = new InteractionBuilder()
  .setName("button-test")
  .setDescription("To test the button handler")
  .setRun(async (interaction, client) => {
    const button = new ButtonBuilder()
      .setCustomId("test_ts")
      .setLabel("Test!")
      .setEmoji("✅")
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await interaction.reply({
      content: "Les see if dis works!",
      components: [row],
    });
  });
