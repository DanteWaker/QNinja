import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/global";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AuthProvider } from "../contexts/AuthContext";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider>
      {getLayout(
        <>
          <Component {...pageProps} />
          <GlobalStyle />
        </>
      )}
    </AuthProvider>
  );
}
