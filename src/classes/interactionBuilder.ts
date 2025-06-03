import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
  ChatInputCommandInteraction,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord.js";
import myClient from "./client";

export default class InteractionBuilder {
  private builder: SlashCommandBuilder;
  private runFunction: (
    interaction: ChatInputCommandInteraction,
    client: myClient,
  ) => void | Promise<void>;

  constructor() {
    this.builder = new SlashCommandBuilder();
    this.runFunction = () => {};

    this.addStringOption = this.builder.addStringOption.bind(this.builder);
    this.addIntegerOption = this.builder.addIntegerOption.bind(this.builder);
    this.addBooleanOption = this.builder.addBooleanOption.bind(this.builder);
    this.addUserOption = this.builder.addUserOption.bind(this.builder);
    this.addChannelOption = this.builder.addChannelOption.bind(this.builder);
    this.addRoleOption = this.builder.addRoleOption.bind(this.builder);
    this.addAttachmentOption = this.builder.addAttachmentOption.bind(
      this.builder,
    );
    this.addMentionableOption = this.builder.addMentionableOption.bind(
      this.builder,
    );
    this.addNumberOption = this.builder.addNumberOption.bind(this.builder);
  }

  public addStringOption!: SlashCommandBuilder["addStringOption"];
  public addIntegerOption!: SlashCommandBuilder["addIntegerOption"];
  public addBooleanOption!: SlashCommandBuilder["addBooleanOption"];
  public addUserOption!: SlashCommandBuilder["addUserOption"];
  public addChannelOption!: SlashCommandBuilder["addChannelOption"];
  public addRoleOption!: SlashCommandBuilder["addRoleOption"];
  public addAttachmentOption!: SlashCommandBuilder["addAttachmentOption"];
  public addMentionableOption!: SlashCommandBuilder["addMentionableOption"];
  public addNumberOption!: SlashCommandBuilder["addNumberOption"];

  setName(name: string) {
    this.builder.setName(name);
    return this;
  }

  setDescription(description: string) {
    this.builder.setDescription(description);
    return this;
  }

  setDMPermission(allowed: boolean) {
    this.builder.setDMPermission(allowed);
    return this;
  }

  setDefaultMemberPermissions(permissions: string | number | bigint | null) {
    this.builder.setDefaultMemberPermissions(permissions);
    return this;
  }

  setNSFW(nsfw: boolean) {
    this.builder.setNSFW(nsfw);
    return this;
  }

  // Sub Commands & Groups
  addSubcommand(
    input: (
      subcommand: SlashCommandSubcommandBuilder,
    ) => SlashCommandSubcommandBuilder,
  ) {
    this.builder.addSubcommand(input);
    return this;
  }

  addSubcommandGroup(
    input: (
      group: SlashCommandSubcommandGroupBuilder,
    ) => SlashCommandSubcommandGroupBuilder,
  ) {
    this.builder.addSubcommandGroup(input);
    return this;
  }

  setRun(
    fn: (interaction: ChatInputCommandInteraction, client: myClient) => void,
  ) {
    this.runFunction = fn;
    return this;
  }

  build(): {
    data: RESTPostAPIApplicationCommandsJSONBody;
    run: (
      interaction: ChatInputCommandInteraction,
      client: myClient,
    ) => void | Promise<void>;
  } {
    return {
      data: this.builder.toJSON(),
      run: this.runFunction,
    };
  }
}
