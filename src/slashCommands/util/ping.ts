import { ColorResolvable, EmbedBuilder } from "discord.js";
import InteractionBuilder from "../../classes/interactionBuilder";

module.exports = new InteractionBuilder()
  .setName("ping")
  .setDescription("A simple ping command")
  .setRun(async (interaction, client) => {
    await interaction.reply("🏓 Pinging...");
    const message = await interaction.fetchReply();
    const emBed = new EmbedBuilder()
      .setTitle("Pong! 🏓")
      .setColor(client.config.embedColor as ColorResolvable)
      .addFields(
        {
          name: "API Latency: ",
          value: `\`\`\`${client.ws.ping}ms\`\`\``,
          inline: true,
        },
        {
          name: "Bot Latency: ",
          value: `\`\`\`${message.createdTimestamp - interaction.createdTimestamp}ms\`\`\``,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({
        text: "Returned Ping!",
        iconURL: client.user!.avatarURL() as string,
      });
    await interaction.editReply({
      embeds: [emBed],
      content: "",
    });
  });
