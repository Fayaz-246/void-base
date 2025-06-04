import buttonFileBuilder from "../../classes/buttonFileBuilder";

module.exports = new buttonFileBuilder()
  .setName("test-ts")
  .setRun(async (i, c) => {
    await i.reply(`Hello from, ${c.user?.username}`);
  });
