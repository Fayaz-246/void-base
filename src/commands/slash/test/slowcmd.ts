import InteractionBuilder from "../../../classes/interactionBuilder";

export default new InteractionBuilder()
  .setName("slowcmd")
  .setDescription("To test the caching system")
  .setCached(true)
  .setRun(async (interaction, client) => {
    setTimeout(async () => {
      await interaction.reply("Heyo this took idk how long les see lol");
    }, 2_000);
  });
