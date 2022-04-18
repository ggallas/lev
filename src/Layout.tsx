// import Navbar from './navbar';
// import Footer from './footer';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { useContext } from './Context';
import Service from './Service';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const {
    context: {
      auth: { token }
    },
    dispatch
  } = useContext();

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
          } else router.push('/login');
        };
        getUser();
      }
    }
  }, [token, dispatch]);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'auth', payload: { token: '', userId: '', userName: '' } });
    router.push('/login');
  };
  // TODO try app in axe/wave for a11y

  // TODO add to readme: convert layout to class/errorBoundary

  return (
    <>
      <Head>
        <title>Lev + Spotify playlist manager</title>
      </Head>
      <Navbar loggedIn={!!token} logOut={handleLogOut} />
      <main>{children}</main>
    </>
  );
}
