import Command from "@builders/prefixCommandBuilder";

export default new Command().setName("test").setRun(async (message, args, client) => {
  await message.reply("Sup prefix commands work");
});
