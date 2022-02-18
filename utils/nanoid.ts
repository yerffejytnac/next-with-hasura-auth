import { customAlphabet } from "nanoid/async";

export const nanoid = customAlphabet(
  // Strip out _ and - to make ids more url friendly.
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  // With custom alphabet and 12 characters, at 9999 IDs per hour,
  // it would take ~92 years to have a probability of a 1% collision.
  12
);
