import { User as NextAuthUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

interface HasuraClaims {
  "x-hasura-allowed-roles": Array<string>;
  "x-hasura-default-role": string;
  "x-hasura-user-id": string;
  "x-hasura-role": string;
}

export interface JWT extends NextAuthJWT {
  id?: string;
  iat: string;
  exp: number;
  "https://hasura.io/jwt/claims": HasuraClaims;
}

export interface User extends NextAuthUser {
  id: string;
}
