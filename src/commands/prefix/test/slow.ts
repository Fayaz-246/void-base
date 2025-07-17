import Command from "@builders/prefixCommandBuilder";

export default new Command()
  .setName("slow")
  .setCached(true)
  .setRun(async (message, client) => {
    setTimeout(async () => {
      await message.reply("Heyo this took idk how long les see lol");
    }, 2_000);
  });
