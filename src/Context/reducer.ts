import { Context } from '.';
import { AuthType, PlaylistType, SongType } from '../types';

type InitListAction = { type: 'initList'; payload: Array<PlaylistType> };
type RemovePlaylistsAction = { type: 'removePlaylists' };
type AddListAction = { type: 'addList'; payload: string };
type RemoveListAction = { type: 'removeList'; payload: string };
type AuthAction = { type: 'auth'; payload: AuthType };
type LogoutAction = { type: 'logout'; payload: Context };
type AddSongAction = { type: 'addSong'; payload: { name: string; song: SongType } };
type AddSongNewPlaylistAction = { type: 'addSongNewPlaylist'; payload: { name: string; song: SongType } };
type RemoveSongAction = { type: 'removeSong'; payload: { name: string; id: string } };
type RemoveAllSongsAction = { type: 'removeAllSongsFromPlaylist'; payload: string };

export type Action =
  | InitListAction
  | RemovePlaylistsAction
  | AddListAction
  | RemoveListAction
  | AuthAction
  | LogoutAction
  | AddSongAction
  | AddSongNewPlaylistAction
  | RemoveSongAction
  | RemoveAllSongsAction;

export function contextReducer(context: Context, action: Action) {
  switch (action.type) {
    case 'auth': {
      return { ...context, auth: action.payload };
    }
    case 'logout': {
      return { ...action.payload };
    }
    case 'initList': {
      return { ...context, playlists: action.payload };
    }
    case 'removePlaylists': {
      localStorage.setItem(`${context.auth.userId}-playlists`, JSON.stringify([]));
      return { ...context, playlists: [] };
    }
    case 'removeList': {
      const newPlaylists = [...context.playlists];
      const listIndexToRemove = newPlaylists.findIndex((playlist: PlaylistType) => playlist.name === action.payload);
      if (listIndexToRemove !== -1) newPlaylists.splice(listIndexToRemove, 1);
      localStorage.setItem(`${context.auth.userId}-playlists`, JSON.stringify(newPlaylists));
      return { ...context, playlists: newPlaylists };
    }
    case 'addSong': {
      const newPlaylists = [...context.playlists];
      const listIndexToUpdate = newPlaylists.findIndex(
        (playlist: PlaylistType) => playlist.name === action.payload.name
      );
      let playlistToUpdate: PlaylistType;
      if (listIndexToUpdate !== -1) {
        playlistToUpdate = newPlaylists[listIndexToUpdate];
        const songAlreadyAdded = playlistToUpdate.songs.some((song: SongType) => song.id === action.payload.song.id);
        if (songAlreadyAdded) return { ...context };
        playlistToUpdate.songs.push(action.payload.song);
      } else return { ...context };
      newPlaylists[listIndexToUpdate] = playlistToUpdate;
      localStorage.setItem(`${context.auth.userId}-playlists`, JSON.stringify(newPlaylists));
      return { ...context, playlists: newPlaylists };
    }
    case 'addSongNewPlaylist': {
      const newPlaylists = [...context.playlists];
      const listIndexToUpdate = newPlaylists.findIndex(
        (playlist: PlaylistType) => playlist.name === action.payload.name
      );
      let playlistToUpdate: PlaylistType;
      if (listIndexToUpdate !== -1) {
        playlistToUpdate = newPlaylists[listIndexToUpdate];
        const songAlreadyAdded = playlistToUpdate.songs.some((song: SongType) => song.id === action.payload.song.id);
        if (songAlreadyAdded) return { ...context };
        playlistToUpdate.songs.push(action.payload.song);
      } else {
        const newPlaylist: PlaylistType = { name: action.payload.name, songs: [action.payload.song] };
        newPlaylists.push(newPlaylist);
        localStorage.setItem(`${context.auth.userId}-playlists`, JSON.stringify(newPlaylists));
        return { ...context, playlists: newPlaylists };
      }
      newPlaylists[listIndexToUpdate] = playlistToUpdate;
      localStorage.setItem(`${context.auth.userId}-playlists`, JSON.stringify(newPlaylists));
      return { ...context, playlists: newPlaylists };
    }
    case 'removeSong': {
      const newPlaylists = [...context.playlists];
      const listIndexToUpdate = newPlaylists.findIndex(
        (playlist: PlaylistType) => playlist.name === action.payload.name
      );
      let playlistToUpdate: PlaylistType;
      if (listIndexToUpdate !== -1) {
        playlistToUpdate = newPlaylists[listIndexToUpdate];
        const songIndexToRemove = playlistToUpdate.songs.findIndex((song: SongType) => song.id === action.payload.id);
        if (songIndexToRemove !== -1) playlistToUpdate.songs.splice(songIndexToRemove, 1);
      } else return { ...context };
      newPlaylists[listIndexToUpdate] = playlistToUpdate;
      localStorage.setItem(`${context.auth.userId}-playlists`, JSON.stringify(newPlaylists));
      return { ...context, playlists: newPlaylists };
    }
    case 'removeAllSongsFromPlaylist': {
      const newPlaylists = [...context.playlists];
      const listIndexToUpdate = newPlaylists.findIndex((playlist: PlaylistType) => playlist.name === action.payload);
      let playlistToUpdate: PlaylistType;
      if (listIndexToUpdate !== -1) {
        playlistToUpdate = newPlaylists[listIndexToUpdate];
        playlistToUpdate.songs = [];
      } else return { ...context };
      newPlaylists[listIndexToUpdate] = playlistToUpdate;
      localStorage.setItem(`${context.auth.userId}-playlists`, JSON.stringify(newPlaylists));
      return { ...context, playlists: newPlaylists };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
}
