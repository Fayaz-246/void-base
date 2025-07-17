import {
  SlashCommandBuilder,
  SlashCommandStringOption,
  SlashCommandUserOption,
  SlashCommandBooleanOption,
  SlashCommandIntegerOption,
  SlashCommandNumberOption,
  SlashCommandRoleOption,
  SlashCommandChannelOption,
  SlashCommandMentionableOption,
  SlashCommandAttachmentOption,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
} from "discord.js";
import {
  AutoCompleteFunction,
  InteractionFlags,
  SlashCommandRunFunction,
} from "../../types/interactions";
import { SlashCommand } from "../../types/main";

export default class InteractionBuilder {
  private builder = new SlashCommandBuilder();
  private runFunction: SlashCommandRunFunction = () => {};
  private autocompleteFunction: AutoCompleteFunction = () => {};
  private isCached = false;
  private deferred = false;
  private deferFlags: InteractionFlags;

  setName(name: string) {
    this.builder.setName(name);
    return this;
  }

  setDescription(description: string) {
    this.builder.setDescription(description);
    return this;
  }

  /*
    <!-----DEPRECEATED----->
    setDMPermission(permission: boolean | null) {
      this.builder.setDMPermission(permission);
      return this;
    }
    <!---------------------->
    */

  setDefaultMemberPermissions(permissions: string | number | bigint | null | undefined) {
    this.builder.setDefaultMemberPermissions(permissions);
    return this;
  }

  setNSFW(nsfw: boolean) {
    this.builder.setNSFW(nsfw);
    return this;
  }

  addStringOption(input: (option: SlashCommandStringOption) => SlashCommandStringOption) {
    this.builder.addStringOption(input);
    return this;
  }

  addUserOption(input: (option: SlashCommandUserOption) => SlashCommandUserOption) {
    this.builder.addUserOption(input);
    return this;
  }

  addBooleanOption(input: (option: SlashCommandBooleanOption) => SlashCommandBooleanOption) {
    this.builder.addBooleanOption(input);
    return this;
  }

  addIntegerOption(input: (option: SlashCommandIntegerOption) => SlashCommandIntegerOption) {
    this.builder.addIntegerOption(input);
    return this;
  }

  addNumberOption(input: (option: SlashCommandNumberOption) => SlashCommandNumberOption) {
    this.builder.addNumberOption(input);
    return this;
  }

  addRoleOption(input: (option: SlashCommandRoleOption) => SlashCommandRoleOption) {
    this.builder.addRoleOption(input);
    return this;
  }

  addChannelOption(input: (option: SlashCommandChannelOption) => SlashCommandChannelOption) {
    this.builder.addChannelOption(input);
    return this;
  }

  addMentionableOption(
    input: (option: SlashCommandMentionableOption) => SlashCommandMentionableOption
  ) {
    this.builder.addMentionableOption(input);
    return this;
  }

  addAttachmentOption(
    input: (option: SlashCommandAttachmentOption) => SlashCommandAttachmentOption
  ) {
    this.builder.addAttachmentOption(input);
    return this;
  }

  addSubcommand(
    input: (subcommand: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder
  ) {
    this.builder.addSubcommand(input);
    return this;
  }

  addSubcommandGroup(
    input: (group: SlashCommandSubcommandGroupBuilder) => SlashCommandSubcommandGroupBuilder
  ) {
    this.builder.addSubcommandGroup(input);
    return this;
  }

  setRun(fn: SlashCommandRunFunction) {
    this.runFunction = fn;
    return this;
  }

  setAutocomplete(fn: AutoCompleteFunction) {
    this.autocompleteFunction = fn;
    return this;
  }

  setCached(cached: boolean) {
    this.isCached = cached;
    return this;
  }

  setDeferred(deferred: boolean) {
    this.deferred = deferred;
    return this;
  }

  setDeferFlags(flags: InteractionFlags) {
    this.deferFlags = flags;
    return this;
  }

  build(): SlashCommand {
    return {
      data: this.builder.toJSON(),
      run: this.runFunction,
      cached: this.isCached,
      autocomplete: this.autocompleteFunction,
      deferred: this.deferred,
      deferFlags: this.deferFlags,
    };
  }
}
