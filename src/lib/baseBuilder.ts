import { BaseComponentInteraction, baseComponentRun } from "../types/bases";
import { ComponentInteractions } from "../types/bases";

export default class baseComponentBuilder<T extends ComponentInteractions> {
  protected customId: string;
  protected run: baseComponentRun<T>;

  constructor() {
    this.customId = "";
    this.run = () => {};
  }

  public setCustomId(id: string): this {
    this.customId = id;
    return this;
  }

  public setRun(fn: baseComponentRun<T>): this {
    this.run = fn;
    return this;
  }

  public build(): BaseComponentInteraction<T> {
    return {
      customId: this.customId,
      run: this.run,
    };
  }
}
