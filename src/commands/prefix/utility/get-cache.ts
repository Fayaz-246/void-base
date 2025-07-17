import { EmbedBuilder } from "discord.js";
import Command from "@builders/prefixCommandBuilder";

export default new Command().setName("get-cache").setRun(async (message, args, client) => {
  const embed = new EmbedBuilder()
    .setTitle("Cache Info")
    .setColor(client.config.embedColor)
    .setTimestamp()
    .setDescription(`\`\`\`\n${client.replyCache.prefix.entries()}\`\`\``);

  await message.reply({ embeds: [embed] });
});
