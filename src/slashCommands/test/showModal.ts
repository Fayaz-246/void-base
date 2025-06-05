import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import InteractionBuilder from "../../classes/interactionBuilder";

module.exports = new InteractionBuilder()
  .setName("show-modal")
  .setDescription("To test the modal handler")
  .setRun(async (interaction, client) => {
    const modal = new ModalBuilder()
      .setCustomId("test_modal")
      .setTitle("Test Modal")
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("input")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setLabel("Input")
        )
      );

    await interaction.showModal(modal);
  });
