import axios from "axios";

interface User {
  id: string;
  name: string;
  guildId: string;
}

export async function getUsers(): Promise<User[]> {
  const url = `${process.env.API_URL}/users`;

  try {
    const res = await axios.get<User[]>(url, {
      headers: {
        "x-api-key": process.env.API_KEY!,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
}

export async function createUser(payload: User) {
  const url = `${process.env.API_URL}/users`;

  try {
    const res = await axios.post(
      url,
      {
        func: "create",
        ...payload,
      },
      {
        headers: {
          "x-api-key": process.env.API_KEY!,
        },
      },
    );

    return res.data;
  } catch (error: any | unknown) {
    return { error: error.response?.data?.error || "Unknown error" };
  }
}

export async function deleteUser(payload: User) {
  const url = `${process.env.API_URL}/users`;
  try {
    const res = await axios.post(
      url,
      {
        func: "del",
        ...payload,
      },
      {
        headers: {
          "x-api-key": process.env.API_KEY!,
        },
      },
    );

    return res.data;
  } catch (error: any | unknown) {
    return { error: error.response?.data?.error || "Unknown Error" };
  }
}
