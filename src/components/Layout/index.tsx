import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../Navbar';
import { initialState, useContext } from '../../Context';
import Service from '../../Service';
import styles from './layout.module.css';
import { useEffect } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { context, dispatch } = useContext();

  const {
    auth: { token }
  } = context;

  useEffect(() => {
    if (!token) {
      const authToken = localStorage.getItem('token');
      if (authToken) {
        const getUser = async () => {
          const userResponse = await Service.getProfile(authToken);
          if (userResponse) {
            const authObject = { token: authToken, userId: userResponse.id, userName: userResponse.display_name };
            const playlistsStorage = localStorage.getItem(`${userResponse.id}-playlists`);
            if (playlistsStorage) {
              dispatch({ type: 'initList', payload: JSON.parse(playlistsStorage) });
            }
            dispatch({ type: 'auth', payload: authObject });
          } else {
            router.push('/login');
          }
        };
        getUser();
      }
    }
  }, [token, dispatch, router]);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'logout', payload: initialState });
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Lev + Spotify playlist manager</title>
      </Head>
      <Navbar loggedIn={!!token} logOut={handleLogOut} />
      <main className={styles.main}>{children}</main>
    </>
  );
}
