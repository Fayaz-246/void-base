import {
  Interaction,
  AutocompleteInteraction,
  InteractionReplyOptions,
  EmbedBuilder,
} from "discord.js";
import myClient from "../classes/client";

// Type that excludes AutocompleteInteraction
type NonAutocompleteInteraction = Exclude<Interaction, AutocompleteInteraction>;

export default async function handleGuildCheck(
  client: myClient,
  interaction: NonAutocompleteInteraction
): Promise<boolean> {
  if (client.utils.guildCheck(client, interaction)) return true;

  const typeMap: Record<string, string> = {
    ChatInputCommandInteraction: "Slash Command",
    ButtonInteraction: "Button",
    ModalSubmitInteraction: "Modal",
    StringSelectMenuInteraction: "Menu",
    UserSelectMenuInteraction: "User Menu",
    RoleSelectMenuInteraction: "Role Menu",
    ChannelSelectMenuInteraction: "Channel Menu",
    MentionableSelectMenuInteraction: "Mentionable Menu",
  };

  const interactionType = interaction.constructor.name;
  const readableType = typeMap[interactionType] || "Interaction";

  const guildCheckErrorEmbed = new EmbedBuilder()
    .setColor(client.config.errorColor)
    .setTimestamp()
    .setTitle("❌ Disallowed")
    .setDescription(`**You can only use this ${readableType} in a guild.**`);

  if (!interaction.replied && !interaction.deferred) {
    await interaction.reply({
      embeds: [guildCheckErrorEmbed],
      flags: 64,
    });
  }

  return false;
}
