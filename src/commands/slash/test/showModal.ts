import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import InteractionBuilder from "../../../classes/interactionBuilder";

export default new InteractionBuilder()
  .setName("modal-test")
  .setDescription("To test the modal handler")
  .setRun(async (interaction, client) => {
    const modal = new ModalBuilder()
      .setCustomId("test_modal")
      .setTitle("Test Modal")
      .addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId("input")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setLabel("Input")
        )
      );

    await interaction.showModal(modal);
  });
