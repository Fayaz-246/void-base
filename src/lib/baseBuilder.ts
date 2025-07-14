import { Interaction } from "discord.js";
import { BaseComponentInteraction, baseComponentRun } from "../types/bases";
import { ComponentInteractions } from "../types/bases";

export default class baseComponentBuilder<T extends ComponentInteractions> {
  protected _customId: string;
  protected _run: baseComponentRun<T>;

  constructor() {
    this._customId = "";
    this._run = () => {};
  }

  public setCustomId(id: string): this {
    this._customId = id;
    return this;
  }

  public setRun(fn: baseComponentRun<T>): this {
    this._run = fn;
    return this;
  }

  public build(): BaseComponentInteraction<T> {
    return {
      customId: this._customId,
      run: this._run,
    };
  }
}
