import InteractionBuilder from "../../classes/interactionBuilder";
import { createUser } from "../../lib/db";

module.exports = new InteractionBuilder()
  .setName("create-user")
  .setDescription("Register a new user to the database")
  .setRun(async (i, c) => {
    const userId = i.user.id;
    const username = i.user.username;
    const guildId = i.guildId!;

    const res = await createUser({ id: userId, name: username, guildId });

    if ("error" in res) {
      return i.reply({ content: `❌ ${res.error}`, flags: 64 });
    }

    i.reply({
      content: `✅ User ${username} registered successfully.`,
    });
  });
