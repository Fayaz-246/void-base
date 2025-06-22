import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ModalSubmitInteraction,
  InteractionReplyOptions,
} from "discord.js";
import config from "../config";

type SupportedInteractions =
  | ChatInputCommandInteraction
  | ButtonInteraction
  | ModalSubmitInteraction
  | AnySelectMenuInteraction;

export default async function handleNoCode(interaction: SupportedInteractions) {
  const errorEmbed = new EmbedBuilder()
    .setColor(config.warnColor)
    .setTimestamp()
    .setTitle("⚠ Error");

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

  errorEmbed.setDescription(`***No code has been written for this ${readableType} yet.***`);

  if (!interaction.replied && !interaction.deferred) {
    await interaction.reply({
      embeds: [errorEmbed],
      flags: 64,
    });
  } else {
    await interaction.followUp({
      embeds: [errorEmbed],
      flags: 64,
    });
  }
}
