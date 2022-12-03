import { User } from "~/types";

export const currentUser = (token: string) => async (): Promise<User> => {
  const authHeader = !!token && { authorization: `Token ${token}` };

  const head = await fetch("https://api.realworld.io/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
    },
  });

  const json = await head.json();

  return json;
};
