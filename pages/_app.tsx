import { ThemeProvider } from "styled-components";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Session } from "next-auth";

import { theme, GlobalStyles } from "@styles";

interface AppProps {
  Component: any;
  pageProps: any;
}

const App = ({ Component, pageProps }: AppProps) => {
  const { session }: { session?: Session | undefined } = pageProps;
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <NextAuthProvider session={session}>
          <Component {...pageProps} />
        </NextAuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
