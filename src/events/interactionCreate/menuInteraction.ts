import {
  ChannelSelectMenuInteraction,
  ComponentType,
  Interaction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
} from "discord.js";
import myClient from "../../classes/client";
import { ChannelSelect, RoleSelect, StringSelect, UserSelect } from "../../types/main";

async function runMenu(client: myClient, interaction: Interaction) {
  if (!interaction.isAnySelectMenu()) return;

  if (!(await client.utils.handleGuildCheck(client, interaction))) return;

  const menuTypes = {
    [ComponentType.StringSelect]: "string",
    [ComponentType.RoleSelect]: "role",
    [ComponentType.UserSelect]: "user",
    [ComponentType.ChannelSelect]: "channel",
  } as const;

  if (!(interaction.componentType in menuTypes)) return;

  const iSelectID = interaction.customId;
  let args: string[] = iSelectID.split("-") || [];
  const menuType = menuTypes[interaction.componentType as keyof typeof menuTypes];
  const menu = getMenu(client, menuType, args[0]);

  if (!menu) return await client.utils.handleNoCode(interaction);

  if (args.shift() == undefined) args = [];

  switch (interaction.componentType) {
    case ComponentType.StringSelect:
      const m = menu as StringSelect;
      await client.utils.runSafe(interaction as StringSelectMenuInteraction, async () => {
        await m.run(interaction, args, client);
      });
      break;

    case ComponentType.RoleSelect:
      await client.utils.runSafe(interaction as RoleSelectMenuInteraction, async () => {
        const m = menu as RoleSelect;
        await m.run(interaction, args, client);
      });
      break;

    case ComponentType.UserSelect:
      await client.utils.runSafe(interaction as UserSelectMenuInteraction, async () => {
        const m = menu as UserSelect;
        await m.run(interaction, args, client);
      });
      break;

    case ComponentType.ChannelSelect:
      await client.utils.runSafe(interaction as ChannelSelectMenuInteraction, async () => {
        const m = menu as ChannelSelect;
        await m.run(interaction, args, client);
      });
      break;
  }
}

export default runMenu;

function getMenu(client: myClient, type: string, id: string) {
  if (!["string", "role", "user", "channel"].includes(type))
    return client.logger.error("MENU INTERACTIONS", "Invalid Menu Type");
  return client.menus[type as keyof typeof client.menus].get(id);
}
