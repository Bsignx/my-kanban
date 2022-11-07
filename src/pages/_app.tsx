import type { AppType } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/700.css';

import { theme } from '../styles/theme';
import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
