import {
  ChannelSelectMenuInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
} from "discord.js";
import baseComponentBuilder from "@lib/baseBuilder";

export class StringSelectFileBuilder extends baseComponentBuilder<StringSelectMenuInteraction> {
  constructor() {
    super();
  }
}

export class RoleSelectFileBuilder extends baseComponentBuilder<RoleSelectMenuInteraction> {
  constructor() {
    super();
  }
}

export class UserSelectFileBuilder extends baseComponentBuilder<UserSelectMenuInteraction> {
  constructor() {
    super();
  }
}

export class ChannelSelectFileBuilder extends baseComponentBuilder<ChannelSelectMenuInteraction> {
  constructor() {
    super();
  }
}
