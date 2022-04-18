import type { NextPage } from 'next';

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import Service from '../src/Service';
import { PlaylistType, SongType } from '../src/types';
import { useContext } from '../src/Context';
import { useInputHook } from '../src/customHooks';
import Song from '../src/components/Song';

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
  const [song, setSong] = useState<SongType>(initialState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  const validation = (input: string) => {
    const clientPattern = /^[A-Za-z0-9]+$/;
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
    if (token && song === initialState) getCurrentSong();
  }, [getCurrentSong, song, token]);

  const handleAddSongNewPlaylist = (event: FormEvent<HTMLFormElement>) => {
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
    <div>Something went wrong..</div>
  ) : loading ? (
    <p>Loading..</p>
  ) : (
    <div>
      <Song variant="playing" song={song} />
      <div>
        <form onSubmit={handleAddSongNewPlaylist}>
          <div>
            <input
              name="new-playlist"
              placeholder="Create new Playlist"
              onChange={event => handlePlaylistInputChange(event)}
              value={playlistInput}
            />
            {playlistInputError && <p>Invalid input, only alphanumerical and maxiumum 20 characters</p>}
            <button type="submit" disabled={playlistInputError}>
              Add song to new playlist
            </button>
          </div>
        </form>
      </div>
      {playlists.length > 0 && (
        <div>
          <form onSubmit={handleAddSong}>
            <select name="add-song" onChange={handlePlaylistSelect} value={selectedPlaylist}>
              <option hidden>{` -- select an option -- `}</option>
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
