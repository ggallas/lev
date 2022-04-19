import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ContextProvider, initialState } from '../src/Context/';
import Layout from '../src/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider values={initialState}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
