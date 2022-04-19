import type { NextPage } from 'next';

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import Service from '../../src/Service';
import { PlaylistType, SongType } from '../../src/types';
import { useContext } from '../../src/Context';
import { useInputHook } from '../../src/customHooks';
import Song from '../../src/components/Song';
import { useRouter } from 'next/router';
import styles from './playing.module.css';
import React from 'react';

const initialState: SongType = {
  name: '',
  artists: [],
  id: ''
};

const Playing: NextPage = () => {
  const {
    context: {
      auth: { token },
      playlists
    },
    dispatch
  } = useContext();
  const [song, setSong] = useState(initialState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const router = useRouter();

  const validation = (input: string) => {
    const clientPattern = /^[\w\-\s]+$/;
    const validateLength = input.length > 0 && input.length <= 20;
    return validateLength && clientPattern.test(input);
  };

  const [playlistInput, playlistInputError, handlePlaylistInputChange] = useInputHook({ validation });

  const getCurrentSong = useCallback(async () => {
    setLoading(true);
    try {
      const current = await Service.getCurrent(token);
      setSong({ name: current.item.name, artists: current.item.artists, id: current.item.id });
      const {
        progress_ms,
        item: { duration_ms }
      } = current;
      setCountdown(duration_ms - progress_ms + 1000);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    let timer: undefined | NodeJS.Timeout;
    if (countdown !== 0) {
      timer = setInterval(() => {
        getCurrentSong();
      }, countdown);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, song, getCurrentSong]);

  useEffect(() => {
    if (token) {
      getCurrentSong();
    }
  }, [getCurrentSong, token, router]);

  const handleAddSongNewPlaylist = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: 'addSongNewPlaylist', payload: { name: playlistInput, song: song } });
    handlePlaylistInputChange('');
  };

  const handlePlaylistSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlaylist(event.target.value);
  };

  const handleAddSong = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'addSong', payload: { name: selectedPlaylist, song } });
    setSelectedPlaylist('');
  };

  return error ? (
    <div>You are not playing any song.. Play a song and refresh browser!</div>
  ) : loading ? (
    <p>Loading..</p>
  ) : (
    <div>
      <Song variant="playing" song={song} />
      <div className={styles.inputContainer}>
        <form onSubmit={handleAddSongNewPlaylist}>
          <div>
            <input
              aria-label="new-playlist"
              placeholder="Create new Playlist"
              type="text"
              onChange={event => handlePlaylistInputChange(event)}
              value={playlistInput}
            />
            {playlistInputError && <p>Invalid input, only alphanumerical and maxiumum 20 characters</p>}
            <button type="submit" disabled={playlistInputError || playlistInput.length === 0}>
              Add song to new playlist
            </button>
          </div>
        </form>
      </div>
      {playlists.length > 0 && (
        <div className={styles.selectContainer}>
          <form onSubmit={handleAddSong}>
            <select aria-label="add-song" onChange={handlePlaylistSelect} value={selectedPlaylist}>
              <option hidden>{` -- Select an option -- `}</option>
              {playlists.map((playlist: PlaylistType) => (
                <option key={playlist.name}>{playlist.name}</option>
              ))}
            </select>

            <button type="submit" disabled={!selectedPlaylist}>
              Add song to playlist
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Playing;
