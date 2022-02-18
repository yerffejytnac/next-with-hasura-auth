import { useState } from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { theme, GlobalStyles } from "@styles";

const App = ({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <NextAuthProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={dehydratedState}>
              <Component {...pageProps} />
              <ReactQueryDevtools />
            </Hydrate>
          </QueryClientProvider>
        </NextAuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
