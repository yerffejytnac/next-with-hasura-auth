import React, { ReactNode } from "react";
import styled from "styled-components";

const Root = styled.div`
  padding: ${(props) => props.theme.space[3]}px;

  & h1 {
    color: ${(props) => props.theme.colors.black};
  }

  & p {
    color: ${(props) => props.theme.colors.gray[900]};
  }
`;

interface Props {
  children?: ReactNode;
}

export const Layout = ({ children }: Props) => <Root>{children}</Root>;
