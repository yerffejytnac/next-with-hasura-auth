import { FormEvent, useState } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { useStorage } from "@hooks";

const Root = styled.div``;

interface Props {}

const LoginPage = (props: Props) => {
  const [email, setEmail] = useState("");
  const { query } = useRouter();
  const { setItem } = useStorage();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) return;

    setItem("email", email);

    signIn("email", {
      email,
      callbackUrl: (query.callbackUrl as string) ?? false,
    });
  };

  return (
    <>
      <Root>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email address</span>
            <input
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              dir="auto"
              id="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="user@example.com"
              spellCheck="false"
              type="email"
              value={email}
            />
          </label>
          <button type="submit" disabled={!email}>
            Log in
          </button>
        </form>
      </Root>
      <pre children={JSON.stringify({ props, email, query }, null, 2)} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (_context) => {
  return {
    props: {},
  };
};

export default LoginPage;
