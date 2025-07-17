import buttonFileBuilder from "@builders/buttonFileBuilder";

export default new buttonFileBuilder().setCustomId("test_ts").setRun(async (i, args, c) => {
  await i.reply(`Hello from, ${c.user?.username}`);
});
