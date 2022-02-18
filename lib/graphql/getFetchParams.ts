import { getSession } from "next-auth/react";

export const getFetchParams = async () => {
  const session = await getSession();
  const token = session?.token;

  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
};
