import type { NextApiRequest, NextApiResponse } from "next";
import jwt, { VerifyOptions } from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const verifyOptions = {
  algorithms: ["HS256"],
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const raw = await getToken({ req, secret, raw: true });
  const token = raw
    ? await jwt.verify(raw, secret, verifyOptions as VerifyOptions)
    : null;

  res.send(JSON.stringify({ token, raw }, null, 2));
};
