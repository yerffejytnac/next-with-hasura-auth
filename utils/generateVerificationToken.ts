import { customAlphabet } from "nanoid/async";

export const generateVerificationToken = customAlphabet(
  // Strip out _, -, and lowercase characters for one-time code generation
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  // With custom alphabet and 6 characters, at 9999 IDs per hour,
  // it would take ~40 minutes to have a probability of a 1% collision.
  // Using 30 minute expiration for codes...
  6
);
