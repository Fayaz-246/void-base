import myClient from "../classes/client";

export type baseComponentRun<T> = (
  interaction: T,
  args: string[] | undefined,
  client: myClient
) => void | Promise<void>;

export interface BaseComponentInteraction<T> {
  customId: string;
  run: baseComponentRun<T>;
}
