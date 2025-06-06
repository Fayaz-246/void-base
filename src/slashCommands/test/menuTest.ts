import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import InteractionBuilder from "../../classes/interactionBuilder";

module.exports = new InteractionBuilder()
  .setName("menu-test")
  .setDescription("To test the menu handler")
  .setRun(async (interaction, client) => {
    const select = new StringSelectMenuBuilder()
      .setCustomId("menu_test")
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        { label: "Opt 1", value: "option-1" },
        { label: "Opt 2", value: "option-2" },
        { label: "Opt 3", value: "option-3" },
        { label: "Opt 4", value: "option-4" }
      );

    await interaction.reply({
      content: "Les see if dis works!",
      components: [new ActionRowBuilder().addComponents(select)],
    });
  });
