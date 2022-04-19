import * as React from 'react';
import { AuthType, PlaylistType, SongType } from './types';

export type Context = { auth: AuthType; playlists: Array<PlaylistType> };
type ProviderProps = { children: React.ReactNode; values: Context };
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
type Action =
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
type Dispatch = (action: Action) => void;

const StateContext = React.createContext<{ context: Context; dispatch: Dispatch } | undefined>(undefined);

function contextReducer(context: Context, action: Action) {
  switch (action.type) {
    // TODO: remove token logic if not needed
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
    // TODO: remove if not needed
    // case 'addList': {
    //   const newPlaylists = [...context.playlists];
    //   const playlistExists = newPlaylists.some((playlist: PlaylistType) => playlist.name === action.payload);
    //   if (playlistExists) return { ...context };
    //   newPlaylists.push({ name: action.payload, songs: [] });
    //   localStorage.setItem(`${context.auth.userId}-playlists`, JSON.stringify(newPlaylists));
    //   console.log('***newPlaylists', newPlaylists);
    //   return { ...context, playlists: newPlaylists };
    // }
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

export const initialState: Context = {
  auth: { token: '', userId: '', userName: '' },
  playlists: []
};

function ContextProvider({ children, values }: ProviderProps) {
  const [context, dispatch] = React.useReducer(contextReducer, values);

  const value = { context, dispatch };
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
}

function useContext() {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useContext must be inside a ContextProvider');
  }
  return context;
}

export { ContextProvider, useContext };

// TODO Remove commented code
// export type Context = { token: string; playlists: Array<PlaylistType> };
// type ProviderProps = { children: React.ReactNode; initialValue: Context };

// const StateContext = React.createContext<{ playlists: Context; setContext: React.Dispatch<Context> } | undefined>(
//   undefined
// );

// const storageToken = localStorage.getItem('token') || '';

// const initialState: Context = {
//   token: storageToken,
//   playlists: []
// };

// function ContextProvider({ children, initialValue }: ProviderProps) {
//   const [playlists, setContext] = React.useState<Context>(initialValue);
//   console.log('***playlists provider', playlists);
//   const value = { playlists, setContext };
//   return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
// }

// function useContext() {
//   const playlists = React.useContext(StateContext);
//   if (playlists === undefined) {
//     throw new Error('useContext must be inside a ContextProvider');
//   }
//   return playlists;
// }

// export { ContextProvider, useContext };
