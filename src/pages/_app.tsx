import "@/styles/globals.scss";
/**
 * Import your scss files here. This helps in enhancing the GT Metrix Grade
 */
import "@/styles/components/card.scss";
import "@/styles/components/button.scss";

import { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "@/shared/components/theme-provider";
import { TooltipProvider } from "@/shared/components/ui/tooltip";

import type { AppProps } from "next/app";
export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      cacheTime: 0,
    },
  },
});

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    /**
     * Query client / QueryClientProvider for using react-query
     */
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    // >
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      <TooltipProvider delayDuration={100}>
        {getLayout(
          <>
            <NextNProgress
              color={"#0a82fd"}
              options={{ showSpinner: false }}
              showOnShallow
              height={5}
            />

            <Component {...pageProps} />
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
    // </ThemeProvider>
  );
}

export default appWithTranslation(App);
