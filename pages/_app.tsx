import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/provider';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { ColorModeScript } from '@chakra-ui/color-mode';
import Theme from '../styles/Theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ColorModeScript initialColorMode={ Theme.config.initialColorMode } />
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;