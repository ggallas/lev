import type { NextPage } from 'next';
import Link from 'next/link';
import { useContext } from '../../src/Context';
import { PlaylistType } from '../../src/types';
import styles from './playlists.module.css';

const Playlists: NextPage = () => {
  const {
    context: { playlists },
    dispatch
  } = useContext();

  const onClickHandler = () => {
    dispatch({ type: 'removePlaylists' });
  };

  const handleRemoveList = (name: string) => {
    dispatch({ type: 'removeList', payload: name });
  };

  return (
    <div className={styles.playlists}>
      <h1>Manage your playlists</h1>
      {playlists?.length > 0 ? (
        <>
          <ul>
            {playlists.map((playlist: PlaylistType) => (
              <li key={playlist.name}>
                <div className={styles.playlistsItemContainer}>
                  <div className={styles.playlistsName}>
                    <Link href={`/playlists/${playlist.name}`}>{playlist.name}</Link>
                  </div>
                  <div>
                    <button onClick={() => handleRemoveList(playlist.name)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={onClickHandler}>Delete all playlists</button>
        </>
      ) : (
        <p>You have no playlists</p>
      )}
    </div>
  );
};

export default Playlists;
