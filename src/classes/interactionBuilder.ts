import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord.js";
import myClient from "./client";

export default class InteractionBuilder extends SlashCommandBuilder {
  private runFunction: (
        interaction: ChatInputCommandInteraction,
        client: myClient,
      ) => void | Promise<void>;
    
  constructor() {
    super()
    this.runFunction = () => {};
  };
  
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
          data: this.toJSON(),
          run: this.runFunction,
        };
      }
}