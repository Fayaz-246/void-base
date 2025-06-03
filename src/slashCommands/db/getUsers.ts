import InteractionBuilder from "../../classes/interactionBuilder";
import { getUsers } from "../../lib/db";

module.exports = new InteractionBuilder()
  .setName("get-users")
  .setDescription("Get all registered users from the database")
  .setRun(async (i, c) => {
    const users = await getUsers();

    if (!users.length) {
      return i.reply({
        content: "No users found in the database.",
        ephemeral: true,
      });
    }

    const list = users
      .map(
        (u) =>
          `**ID**: ${u.id}, **Name**: ${u.name}, **Guild ID**: ${u.guildId}`,
      )
      .join("\n");

    i.reply({ content: list.slice(0, 2000) });
  });
