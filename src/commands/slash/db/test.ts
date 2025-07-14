import InteractionBuilder from "../../../classes/interactionBuilder";
import UserModel from "@schemas/testSchema";

export default new InteractionBuilder()
  .setName("testdb")
  .setDescription("Test DB operations")
  .addSubcommand((sub) => sub.setName("add").setDescription("Add yourself to the DB"))
  .addSubcommand((sub) => sub.setName("get").setDescription("Fetch your DB entry"))
  .addSubcommand((sub) => sub.setName("delete").setDescription("Remove yourself from the DB"))
  .setRun(async (interaction) => {
    const sub = interaction.options.getSubcommand();
    const userId = interaction.user.id;

    switch (sub) {
      case "add": {
        const existing = await UserModel.findOne({ UserID: userId });
        if (existing) {
          await interaction.reply({ content: "You're already in the DB.", flags: 64 });
        } else {
          await UserModel.create({ UserID: userId });
          await interaction.reply({ content: "Added to the DB!", flags: 64 });
        }
        break;
      }

      case "get": {
        const entry = await UserModel.findOne({ UserID: userId });
        if (entry) {
          await interaction.reply({ content: `Found entry: \`${entry.UserID}\``, flags: 64 });
        } else {
          await interaction.reply({ content: "No entry found.", flags: 64 });
        }
        break;
      }

      case "delete": {
        const result = await UserModel.deleteOne({ UserID: userId });
        if (result.deletedCount === 0) {
          await interaction.reply({ content: "No entry to delete.", flags: 64 });
        } else {
          await interaction.reply({ content: "Deleted your entry from the DB.", flags: 64 });
        }
        break;
      }

      default:
        await interaction.reply({ content: "Invalid subcommand.", flags: 64 });
    }
  });
