import { Interaction } from "discord.js";
import { BaseComponentInteraction, baseComponentRun } from "../types/bases";
import { ComponentInteractions } from "../types/interactions";

export default class baseComponentBuilder<T extends ComponentInteractions> {
  protected _customId: string;
  protected _run: baseComponentRun<T>;

  constructor() {
    this._customId = "";
    this._run = () => {};
  }

  setCustomId(id: string) {
    this._customId = id;
    return this;
  }

  setRun(fn: baseComponentRun<T>) {
    this._run = fn;
    return this;
  }

  build(): BaseComponentInteraction<T> {
    return {
      customId: this._customId,
      run: this._run,
    };
  }
}
