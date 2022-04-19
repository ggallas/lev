import React from 'react';
import { AuthType, PlaylistType } from '../types';
import { Action, contextReducer } from './reducer';

export type Context = { auth: AuthType; playlists: Array<PlaylistType> };
type ProviderProps = { children: React.ReactNode; values: Context };
type Dispatch = (action: Action) => void;

const StateContext = React.createContext<{ context: Context; dispatch: Dispatch } | undefined>(undefined);

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
