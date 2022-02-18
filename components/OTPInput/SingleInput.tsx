import React, { memo, useRef, useEffect } from "react";
import styled from "styled-components";
import { usePrevious } from "@hooks";

const Input = styled.input`
  outline: 0;
  width: 44px;
  height: 44px;
  line-height: 1;
  padding: 0;
  text-align: center;
  margin: 0.25rem;
  font-size: 28px;
  font-family: ${({ theme }) => theme.fonts.monospace};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-variant-numeric: tabular-nums;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 0;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[300]};

  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.colors.blue[800]};
  }
`;

export interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

export const SingleInputComponent = ({
  focus,
  autoFocus,
  ...props
}: SingleOTPInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);

  useEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return (
    <Input
      type="text"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      dir="auto"
      autoCapitalize="characters"
      ref={inputRef}
      {...props}
    />
  );
};

export const SingleInput = memo(SingleInputComponent);
