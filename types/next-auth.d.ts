import NextAuth from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

interface HasuraClaims {
  "x-hasura-allowed-roles": Array<string>;
  "x-hasura-default-role": string;
  "x-hasura-user-id": string;
  "x-hasura-role": string;
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    // name?: string | null;
    // email?: string | null;
    // picture?: string | null;
    // sub?: string;
    iat: string;
    exp: number;
    "https://hasura.io/jwt/claims": HasuraClaims;
  }
}
