import { Interaction } from "discord.js";
import { baseRun } from "../interfaces/bases";

export default class baseComponentBuilder<T extends Interaction> {
  protected _customId: string;
  protected _run: baseRun<T>;

  constructor() {
    this._customId = "";
    this._run = () => {};
  }

  setCustomId(id: string) {
    this._customId = id;
    return this;
  }

  setRun(fn: baseRun<T>) {
    this._run = fn;
    return this;
  }

  build() {
    return {
      customId: this._customId,
      run: this._run,
    };
  }
}
