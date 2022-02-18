import { NextApiRequest, NextApiResponse } from "next";
import jwt, { VerifyOptions } from "jsonwebtoken";
import NextAuth, { NextAuthOptions } from "next-auth";
import { createTransport } from "nodemailer";
import EmailProvider from "next-auth/providers/email";
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ConnectionOptions } from "typeorm";

import { html, text } from "@lib/email/auth/verificationRequest";

const secret = process.env.NEXTAUTH_SECRET;

const connection: ConnectionOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOSTNAME,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  namingStrategy: new SnakeNamingStrategy(),
};

const options: NextAuthOptions = {
  adapter: TypeORMLegacyAdapter(connection),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        secure: true,
        port: parseInt(process.env.EMAIL_SERVER_PORT, 10),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      from: process.env.EMAIL_FROM,
      // Set link expiration to 30 minutes (in seconds)...
      maxAge: 1800,
      sendVerificationRequest: async ({
        identifier: email,
        provider,
        url,
      }: any) => {
        return new Promise((resolve, reject) => {
          const { server, from } = provider;
          const { host } = new URL(url);

          createTransport(server).sendMail(
            {
              to: email,
              from,
              subject: `Confirm your Email`,
              text: text({ url, host, email }),
              html: html({ url, host, email }),
            },
            (error) => {
              if (error) {
                console.error("SEND_VERIFICATION_EMAIL_ERROR", email, error);
                return reject(new Error("SEND_VERIFICATION_EMAIL_ERROR"));
              }
              return resolve();
            }
          );
        });
      },
    }),
  ],
  secret,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret,
    maxAge: 60 * 60 * 24 * 30,
    encode: async ({ secret, token }: any) => {
      const jwtClaims = {
        sub: token.sub,
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub,
        },
      };

      const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });
      return encodedToken;
    },
    decode: async ({ secret, token }: any): Promise<any> => {
      const verifyOptions = {
        algorithms: ["HS256"],
      };
      const decodedToken = jwt.verify(
        token,
        secret,
        verifyOptions as VerifyOptions
      );
      return decodedToken;
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
    error: "/error",
    signOut: "/logout",
  },
  callbacks: {
    redirect: async ({ url }) => {
      return Promise.resolve(url);
    },
    async session({ session, token, user }: any) {
      const encodedToken = jwt.sign(token, secret, {
        algorithm: "HS256",
      });

      console.log("callbacks:session");
      console.log({ session, token, user });

      session.id = token?.sub;
      session.token = encodedToken;

      return Promise.resolve(session);
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("callbacks:jwt");
      console.log({ token, user, account, profile, isNewUser });

      if (user) {
        token.sub = user.id;
      }

      return Promise.resolve(token);
    },
    // async redirect({url, baseUrl}) { return baseUrl },
    // async signIn({user, account, profile, email, credentials}) { return true },
  },
  debug: true,
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
