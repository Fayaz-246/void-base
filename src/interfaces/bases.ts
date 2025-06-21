import myClient from "../classes/client";

export type baseRun<T> = (
  interaction: T,
  args: string[] | undefined,
  client: myClient
) => void | Promise<void>;

export interface BaseComponentInteraction<T> {
  customId: string;
  run: baseRun<T>;
}
