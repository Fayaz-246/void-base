import { EmbedBuilder } from "discord.js";
import InteractionBuilder from "../../classes/interactionBuilder";

module.exports = new InteractionBuilder()
  .setName("help")
  .setDescription("A basic help command")
  .addStringOption((option) =>
    option.setName("command").setDescription("Search for a specific command").setAutocomplete(true)
  )
  .setCached(true)
  .setAutocomplete(async (interaction, client) => {
    const focused = interaction.options.getFocused().toLowerCase();

    const matches = client?.interactions
      .map((cmd) => {
        const json = client.utils.resolveCommandJSON(cmd.data);

        const name = json.name.toLowerCase();
        let score = 0;
        if (name.startsWith(focused)) score += 2;
        if (name.includes(focused)) score += 1;

        return { name: json.name, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 25);

    if (!matches || matches.length === 0) {
      await interaction.respond([{ name: "No matches found", value: "n/a" }]);
      return;
    }

    await interaction.respond(
      matches.map((entry) => ({
        name: entry.name,
        value: entry.name,
      }))
    );
  })
  .setRun(async (interaction, client) => {
    const input = interaction.options.getString("command");
    const embed = new EmbedBuilder().setColor(client.config.embedColor).setTimestamp();

    if (!input) {
      const categories: Record<string, string[]> = {};

      for (const cmd of client.interactions.values()) {
        const json = client.utils.resolveCommandJSON(cmd.data);
        const folder =
          client.utils.formatStr((cmd as any).folder)?.replace("-", " ") || "Uncategorized";
        const line = `${json.name} — ${json.description || "*No description*"}`;

        if (!categories[folder]) categories[folder] = [];
        categories[folder].push(line);
      }

      for (const category in categories) {
        categories[category].sort((a, b) => a.localeCompare(b));
      }

      const sortedCategories = Object.entries(categories).sort(([a], [b]) => a.localeCompare(b));

      const description = sortedCategories
        .map(([category, lines]) => `**${category}**\n\`\`\`md\n${lines.join("\n")}\`\`\``)
        .join("\n");

      embed.setTitle(`${client.user?.username}'s Commands`).setDescription(description);

      await interaction.reply({ embeds: [embed], flags: 64 });
      return;
    }

    const cmd = client.interactions.get(input);
    if (!cmd) {
      await interaction.reply({
        content: "❌ That command does not exist.",
        flags: 64,
      });
      return;
    }

    const json = client.utils.resolveCommandJSON(cmd.data);
    const folder =
      client.utils.formatStr((cmd as any).folder)?.replace("-", " ") || "Uncategorized";

    embed
      .setTitle(`${client.utils.formatStr(json.name)} Command`)
      .setDescription(
        `**Category**: \`${folder}\`\n**Description:**\`${json.description || "*No description*"}\``
      );

    await interaction.reply({
      embeds: [embed],
      flags: 64,
    });
  });
