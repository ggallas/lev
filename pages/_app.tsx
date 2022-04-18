import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Context, ContextProvider } from '../src/Context';
import Layout from '../src/Layout';

// TODO: Add layout and try setting token in context

const initialState: Context = {
  auth: { token: '', userId: '', userName: '' },
  playlists: [],
  credentials: { clientId: '', clientSecret: '' }
};

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
