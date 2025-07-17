import { PrefixCommand } from "src/types/main";
import { PrefixCommandRun } from "src/types/prefixCommands";

export default class PrefixCommandBuilder {
  private name: string;
  private aliases: string[];
  private run: PrefixCommandRun;
  private cached: boolean;

  constructor() {
    this.name = "";
    this.aliases = [];
    this.run = () => {};
    this.cached = false;
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setAliases(al: string[]): this {
    this.aliases = al;
    return this;
  }

  setCached(value: boolean): this {
    this.cached = value;
    return this;
  }

  setRun(fn: PrefixCommandRun): this {
    this.run = fn;
    return this;
  }

  build(): PrefixCommand {
    return {
      data: {
        name: this.name,
        aliases: this.aliases,
        cached: this.cached,
      },
      run: this.run,
    };
  }
}
