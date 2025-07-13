/*
 * Basic logger, no need to use chalk anymore!
 */

export const Colors = {
  Red: "\x1B[31m",
  Yellow: "\x1B[33m",
  Green: "\x1B[32m",
  Blue: "\x1B[34m",
  Purple: "\x1B[38;5;129m",
  Reset: "\x1B[0m",
};

export function log(ident: string, str: string): void {
  console.log(`${Colors.Purple}[${ident}]${Colors.Reset} ${str}`);
}

export function warn(ident: string, str: string): void {
  console.log(`${Colors.Yellow}[${ident}]${Colors.Reset} ${str}`);
}

export function error(ident: string, str: string): void {
  console.log(`${Colors.Red}[${ident}]${Colors.Reset} ${str}`);
}

export function info(ident: string, str: string): void {
  console.log(`${Colors.Blue}[${ident}]${Colors.Reset} ${str}`);
}

export function success(ident: string, str: string): void {
  console.log(`${Colors.Green}[${ident}]${Colors.Reset} ${str}`);
}
