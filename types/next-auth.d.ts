import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    token: string;
  }
  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {}
}
