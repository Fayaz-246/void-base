import InteractionBuilder from "../../classes/interactionBuilder";
import { deleteUser } from "../../lib/db";

module.exports = new InteractionBuilder()
  .setName("delete-user")
  .setDescription("Delete a user from the database")
  .setRun(async (i, c) => {
    const userId = i.user.id;
    const username = i.user.username;
    const guildId = i.guildId!;

    const res = await deleteUser({ id: userId, name: username, guildId });

    if ("error" in res) {
      return i.reply({ content: `❌ ${res.error}`, flags: 64 });
    }

    i.reply({
      content: `✅ Deleted ${username}(${userId}) from the Database.`,
    });
  });
