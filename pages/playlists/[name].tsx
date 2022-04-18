import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Song from '../../src/components/Song';
import { useContext } from '../../src/Context';
import { PlaylistType, SongType } from '../../src/types';
import styles from '../styles/Home.module.css';

const Playlists: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistType>();
  const {
    context: { playlists },
    dispatch
  } = useContext();

  useEffect(() => {
    const playlist = playlists.find((playlist: PlaylistType) => playlist.name === name);
    setCurrentPlaylist(playlist);
  }, [playlists, name]);

  const removeSongHandler = (id: string) => {
    if (currentPlaylist?.name) {
      dispatch({ type: 'removeSong', payload: { name: currentPlaylist.name, id: id } });
    }
  };
  const removeAllSongsHandler = () => {
    if (currentPlaylist?.name) {
      dispatch({ type: 'removeAllSongsFromPlaylist', payload: currentPlaylist.name });
    }
  };

  return (
    <div>
      <h1>Edit your playlist</h1>
      <h2>Playlist name: {currentPlaylist?.name}</h2>
      {currentPlaylist && currentPlaylist.songs.length > 0 ? (
        <ul>
          {currentPlaylist.songs.map((song: SongType) => (
            <li key={song.name}>
              <Song song={song} onClick={() => removeSongHandler(song.id)} />
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no playlists</p>
      )}
      <button onClick={removeAllSongsHandler}>Remove all songs</button>
    </div>
  );
};

export default Playlists;
