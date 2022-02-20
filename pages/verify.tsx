import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";

import { useStorage } from "@hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { OTPInput } from "@components";

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  background-color: ${(props) => props.theme.colors.gray[50]};

  & + pre {
    display: none;
    visibility: hidden;
    background-color: ${(props) => props.theme.colors.gray[900]};
    color: ${(props) => props.theme.colors.gray[100]};
    padding: ${(props) => props.theme.space[4]}px;
    margin: 0;
    max-width: 100%;
    overflow: hidden;
    overflow-x: scroll;
    touch-action: pan-x;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: 25vh;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;

  & h1 {
    margin-bottom: ${(props) => props.theme.space[3]}px;
  }

  & p {
    margin: 0;
    margin-bottom: ${(props) => props.theme.space[3]}px;
    text-align: center;
    max-width: 80vw;

    & strong {
      font-weight: ${({ theme }) => theme.fontWeights.medium};
    }
  }

  & button {
    background-color: ${({ theme }) => theme.colors.blue[800]};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    outline: 0;
    padding: 0.675rem 2.5rem;
    border-radius: ${({ theme }) => theme.radii[5]};
    cursor: pointer;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    letter-spacing: 0.02em;

    &:active {
      background-color: ${({ theme }) => theme.colors.blue[900]};
    }
  }
`;

const VerifyRequestPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [callbackUrl, setCallbackUrl] = useState<string | false>(false);
  const [token, setToken] = useState("");
  const { getItem, removeItem } = useStorage();

  useEffect(() => {
    if (!email) {
      setEmail(getItem("email"));
    }
    if (!callbackUrl) {
      setCallbackUrl(getItem("callbackUrl"));
    }
  }, []);

  useEffect(() => {
    if (session) {
      if (email) {
        removeItem("email");
      }
      if (callbackUrl) {
        removeItem("callbackUrl");
      }
      if (callbackUrl) {
        router.push(callbackUrl);
      }
    }
  }, [email, session]);

  const verifyOTPCode = useCallback(() => {
    window.location.href = `/api/auth/callback/email?email=${encodeURIComponent(
      email
    )}&token=${token.toUpperCase()}${
      callbackUrl ? `&callbackUrl=${callbackUrl}` : ""
    }`;
  }, [callbackUrl, token, email]);

  return (
    <Root>
      <Container>
        <h1>Verify it's you</h1>

        <p>
          Enter the verification code we sent to your email{" "}
          <strong>{email}</strong> in the field below.
        </p>
        <OTPInput autoFocus length={6} onChange={(value) => setToken(value)} />
        <button disabled={!token} onClick={() => verifyOTPCode()}>
          Verify Code
        </button>
      </Container>
    </Root>
  );
};

export const getServerSideProps: GetServerSideProps = async (_context) => {
  return {
    props: {},
  };
};

export default VerifyRequestPage;
