import { ButtonInteraction } from "discord.js";
import myClient from "./client";

export default class buttonBuilder {
  private _name: string;
  private _run: (
    interaction: ButtonInteraction,
    args: string[] | null,
    client: myClient
  ) => void | Promise<void>;

  constructor() {
    this._name = "";
    this._run = () => {};
  }

  setName(name: string) {
    this._name = name;
    return this;
  }

  setRun(
    fn: (
      interaction: ButtonInteraction,
      args: string[] | null,
      client: myClient
    ) => void | Promise<void>
  ) {
    this._run = fn;
    return this;
  }

  build() {
    return {
      name: this._name,
      run: this._run,
    };
  }
}
