import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext } from '../src/Context/';

const Home: NextPage = () => {
  const {
    context: {
      auth: { userName }
    }
  } = useContext();
  const router = useRouter();

  const onClickHandler = () => {
    const redirect = userName ? '/playing' : '/login';
    router.push(redirect);
  };

  return (
    <div>
      <h1>Welcome {userName}!</h1>
      <p>
        In this application you will be able to view the song you are currently playing, create, modify and remove
        playlists
      </p>
      <button onClick={onClickHandler} style={{ marginTop: '1rem' }}>
        Get started!
      </button>
    </div>
  );
};

export default Home;
