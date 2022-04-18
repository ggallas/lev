export type ArtistType = {
  id: string;
  name: string;
};

export type SongType = {
  name: string;
  artists: Array<ArtistType>;
  id: string;
};

export type PlaylistType = {
  name: string;
  songs: Array<SongType>;
};

export type AuthType = {
  token: string;
  userId: string;
  userName: string;
};

export type CredentialsType = {
  clientId: string;
  clientSecret: string;
};
