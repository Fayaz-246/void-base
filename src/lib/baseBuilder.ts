import { Interaction } from "discord.js";
import myClient from "../classes/client";

export default class baseComponentBuilder<T extends Interaction> {
  protected _customId: string;
  protected _run: (
    interaction: T,
    args: string[] | undefined,
    client: myClient
  ) => void | Promise<void>;

  constructor() {
    this._customId = "";
    this._run = () => {};
  }

  setCustomId(id: string) {
    this._customId = id;
    return this;
  }

  setRun(
    fn: (
      interaction: T,
      args: string[] | undefined,
      client: myClient
    ) => void | Promise<void>
  ) {
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
