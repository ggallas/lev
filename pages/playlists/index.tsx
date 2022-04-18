import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from '../../src/Context';
import { PlaylistType } from '../../src/types';
import styles from '../styles/Home.module.css';

const Playlists: NextPage = () => {
  const {
    context: { playlists },
    dispatch
  } = useContext();

  const onClickHandler = () => {
    dispatch({ type: 'initList', payload: [] });
  };

  return (
    <div>
      <h1>Manage your playlists</h1>
      {playlists.length > 0 ? (
        <ul>
          {playlists.map((playlist: PlaylistType) => (
            <li key={playlist.name}>
              <Link href={`/playlists/${playlist.name}`}>{playlist.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no playlists</p>
      )}
      <button onClick={onClickHandler}>Delete all playlists</button>
    </div>
  );
};

export default Playlists;
