import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { useRouter } from 'next/router';
import Service from '../../src/Service';

const LogIn: NextPage = () => {
  const router = useRouter();

  const handleLogIn = () => {
    const initAuthUrl = Service.getAuthUrl();
    router.push(initAuthUrl);
  };

  return (
    <div>
      <h1>Log in</h1>
      <p>Remember to set your credentials in .env.local variable and build the project again</p>
      <button onClick={handleLogIn}>Sign in</button>
    </div>
  );
};

export default LogIn;
