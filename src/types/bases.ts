import myClient from "../classes/client";
import { ComponentInteractions } from "./interactions";

export type baseComponentRun<T extends ComponentInteractions> = (
  interaction: T,
  args: string[] | undefined,
  client: myClient
) => void | Promise<void>;

export interface BaseComponentInteraction<T extends ComponentInteractions> {
  customId: string;
  run: baseComponentRun<T>;
}
