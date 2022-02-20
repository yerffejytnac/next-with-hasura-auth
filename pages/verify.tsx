import { useEffect, useState } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";

import { useStorage } from "@hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
`;

const VerifyRequestPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const { getItem, removeItem } = useStorage();

  useEffect(() => {
    if (!email) {
      setEmail(getItem("email"));
    }
  }, []);

  useEffect(() => {
    if (session) {
      if (email) {
        removeItem("email");
      }
      router.push("/profile");
    }
  }, [email, session]);

  return (
    <Root>
      <Container>
        <h1>Verify it's you</h1>
        <p>
          Click on the sign in link we sent to your email{" "}
          <strong>{email}</strong> to finish logging in.
        </p>
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
