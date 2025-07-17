<h1 align="center">Void Base</h1>
<p align="center"><em>A simple yet flexible Discord bot base built with <a href="https://discord.js.org/">Discord.js</a> and <a href="https://www.typescriptlang.org/">TypeScript</a>.</em></p>

<p align="center">
  <a href="https://github.com/Fayaz-246/void-base">
    <img src="https://img.shields.io/github/stars/Fayaz-246/void-base?style=flat-square" alt="GitHub stars">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License">
  </a>
  <a href="https://discord.js.org">
    <img src="https://img.shields.io/badge/discord.js-14.19.3-blue?style=flat-square&logo=discord" alt="Discord.js">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-5.8.3-blue?style=flat-square&logo=typescript" alt="TypeScript">
  </a>
</p>

---

## Table of Contents

- [About](#about)
- [Credits](#credits)
- [Usage](#usage)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Basic Features](#basic-features)
  - [File Formats](#file-formats)
    - [Slash Commands](#slash-commands)
    - [Buttons](#buttons)
    - [Modals](#modals)
    - [Menus](#menus)
  - [Events](#events)
  - [Database (DB)](#database-db)
- [Contributing](#contributing)

---

## About

**Void Base** is a Discord bot foundation focused on simplicity, clarity, and speed. It's designed to help you get started quickly while maintaining flexibility for expansion.

Built using:

- [Discord.js](https://discord.js.org/)
- [TypeScript](https://www.typescriptlang.org/)

---

## Credits

- **Created By:** [Fayaz](https://fayaz.is-a.dev/)
- **Inspired By:** [MicroBase](https://github.com/MusicMakerOwO/MicroBase) by [MusicMaker](https://github.com/MusicMakerOwO/)

---

## Usage

### Installation

Clone the repository, install dependencies, compile, and run:

```bash
git clone https://github.com/Fayaz-246/void-base.git
cd void-base
npm install
npm run build    # or: npm run build:unix (if you're on Linux/macOS)
npm start
```

**Note:** Rename `.env.example` to `.env` and add your bot token.

---

### Configuration

Configuration is done in `src/config.ts`. Using TypeScript for config gives you type safety and editor hints.

```ts
interface BaseConfig {
  embedColor: ColorResolvable; // Default embed color
  errorColor: ColorResolvable; // Embed color for errors
  warnColor: ColorResolvable; // Embed color for warning messages
  successColor: ColorResolvable; // Embed color for success responses
  verbose: boolean; // Log every interaction
  checkEventNames: boolean; // Check if the events in src/events are valid
  requireGuildOnly: boolean; // Make all interactions & components only usable in guilds
}
```

---

### Basic Features

- Full support for interactions (except context menus; coming soon!)
- Built-in caching via the `TimedCache` from [CachesJS](https://cachesjs.com/) _`src/lib/TimedCache.ts`_
- Response caching for static commands via `.setCached(true)`

---

## File Formats

Organize your files like so:

- [`src/commands/slash/{category}`](#slash-commands)
- [`src/commands/prefix/{category}`](#prefix-commands)
- [`src/components/buttons/{type}`](#buttons)
- [`src/components/modals/{type}`](#modals)
- [`src/components/menus/{type}`](#menus)

---

### Slash Commands

Slash commands **must** be placed in a subfolder inside `src/commands/slash/`.

**Example:**

```ts
// src/commands/slash/test/test.ts
import InteractionBuilder from "@builders/interactionBuilder";

export default new InteractionBuilder()
  .setName("test")
  .setDescription("An example command")
  // .setCached(true)      // Enable caching (optional)
  // .setDefer(true)       // Auto-defer reply (optional)
  // .setDeferFlags(64)    // Flags to use with auto-defer (optional)
  .setRun(async (interaction, client) => {
    await interaction.reply({ content: "Heyo!", flags: 64 });
  });

// .setAutocomplete(async (interaction, client) => {})
```

The `InteractionBuilder` class is similar to `SlashCommandBuilder` with added methods:

- `.setRun(callback)`
- `.setAutocomplete(callback)`
- `.setCached(boolean)`
- `.setDefer(boolean)`
- `.setDeferFlags(int)`
- `.build()`

#### Notes on Auto-Defer + Caching

If you enable both `.setCached(true)` and `.setDefer(true)`, then:
`.setDeferFlags(...)` will not be preserved in the final `.reply()` call.
You must manually include flags again inside your `.setRun()` reply to ensure proper visibility (e.g. ephemeral).

```ts
// In a deferred & cached commands setRun method
await interaction.reply({
  content: "Cached response!",
  flags: 64, // Required again even if .setDeferFlags(64) was used
});
```

---

### Prefix Commands

Prefix commands **must** be placed in a subfolder inside` src/commands/prefix`

**Example:**

```ts
//src/commands/prefix/test/test.ts
import Command from "@builders/prefixCommandBuilder";

export default new Command()
    .setName("test")
//  .setCached("true")
    .setRun(async (message, args, client) => {
        await message.reply("Sup prefix commands work");
    });
```

The `PrefixCommandBuilder` class has the following methods:
- `.setName(string)`
- `.setRun(callback)`
- `.setAliases(string[])`
- `.setCached(boolean)`

_`The caching literally just stores the commands response so it's only useful for static commands.`_

---

### Buttons

**Directory:** `src/components/buttons/{type}`

```ts
import buttonFileBuilder from "@builders/buttonFileBuilder";

export default new buttonFileBuilder()
  .setCustomId("test")
  .setRun(async (interaction, args, client) => {
    await interaction.reply(`Hello from ${client.user?.username}`);
  });
```

---

### Modals

**Directory:** `src/components/modals/{type}`

```ts
import modalFileBuilder from "@builders/modalFileBuilder";

export default new modalFileBuilder()
  .setCustomId("test_modal")
  .setRun(async (interaction, args, client) => {
    const inp = interaction.fields.getTextInputValue("input");
    await interaction.reply(`Input: ${inp}`);
  });
```

---

### Menus

**Directory:** `src/components/menus/{type}`

The `type` folder should be one of:

- `string`
- `user`
- `channel`
- `role`

**Example:**

```ts
import { StringSelectFileBuilder } from "@builders/menuFileBuilder";

export default new StringSelectFileBuilder()
  .setCustomId("menu_test")
  .setRun(async (interaction, args, client) => {
    await interaction.reply(interaction.values[0]);
  });
```

---

### Component Arguments

Custom IDs are parsed by splitting on `-`, and the resulting array is passed as `args`.

Example:

```ts
Custom ID: "test_Hi@Lol-1-arg2-whatsup"
Args: ['1', 'arg2', 'whatsup']
```

> All component builders extend the [`baseBuilder`](https://github.com/Fayaz-246/void-base/blob/main/src/lib/baseBuilder.ts) class.

---

### Events

Events go in `src/events/{eventName}/`.

- Each file in the folder is executed when the event is triggered.
- Files must export a function with signature: `(client, ...args)`
- Subfolders **are not supported** inside event folders.

---

### Database (DB)

Void Base uses MongoDB. 

- Define schemas in `src/schemas`, access them by using `@schemas/<name>` in your command files.

## Contributing

<a href="https://github.com/Fayaz-246/void-base/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/Fayaz-246/void-base/format.yaml?label=GitHub Actions&style=flat-square" alt="GitHub Actions">
  </a>

Contributions are welcome! If you'd like to improve this base, add new features, fix bugs, or suggest ideas — feel free to fork the repo and open a pull request.

Please try to follow the existing code style, and write clear commit messages.

- Don't commit huge changes across multiple files at once.

> Even small improvements like typo fixes or better docs are appreciated :)

> Make sure you run `npm run format` before committing!

```sh
1. Fork the repository
2. Create a new branch (`git checkout -b your-feature`)
3. Commit your changes (`git commit -m "Added awesome feature"`)
4. Push to the branch (`git push origin your-feature`)
5. Open a pull request
```

