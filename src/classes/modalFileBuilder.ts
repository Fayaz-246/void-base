import { ModalSubmitInteraction } from "discord.js";
import myClient from "./client";

export default class modalFileBuilder {
  private _customId: string;
  private _run: (
    interaction: ModalSubmitInteraction,
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
      interaction: ModalSubmitInteraction,
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
