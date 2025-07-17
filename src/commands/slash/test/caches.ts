import { EmbedBuilder } from "discord.js";
import InteractionBuilder from "@builders/interactionBuilder";

export default new InteractionBuilder()
  .setName("get-cache")
  .setDescription("To test the button handler")
  .addStringOption((o) =>
    o
      .setName("cache")
      .setDescription("The cache to get")
      .addChoices({ name: "reply", value: "rc" }, { name: "main", value: "mc" })
      .setRequired(true)
  )
  .setRun(async (interaction, client) => {
    const cache = interaction.options.getString("cache", true);
    const embed = new EmbedBuilder()
      .setTitle("Cache Info")
      .setColor(client.config.embedColor)
      .setTimestamp();
    let clientCache;
    if (cache == "rc") clientCache = client.replyCache.interactions.entries();
    else clientCache = client.cache.entries();

    embed.setDescription(`\`\`\`\n${clientCache}\`\`\``);

    await interaction.reply({
      embeds: [embed],
    });
  });
