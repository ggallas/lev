import { ArtistType, SongType } from '../../types';
import styles from './song.module.css';

type SongComponentProps = {
  variant?: 'list' | 'playing';
  song: SongType;
  onClick?: () => void;
};

const Song = ({ variant = 'list', song, onClick }: SongComponentProps) => {
  if (variant === 'list') {
    const { artists } = song;
    let artistString = '';
    for (let i = 0; i < artists.length; i++) {
      if (i === artists.length - 1) {
        artistString += `${artists[i].name}`;
      } else artistString += `${artists[i].name} & `;
    }
    return (
      <div className={styles.song}>
        <div>
          <p>{song.artists?.length > 1 ? `Artists: ${artistString}` : `Artist: ${artistString}`}</p>
          <p>{`Song name: ${song.name}`}</p>
        </div>
        <div>
          <button onClick={onClick}>Remove</button>
        </div>
      </div>
    );
  }
  if (variant === 'playing') {
    return (
      <div>
        <h1>Currently playing</h1>
        <h2>{song.artists?.length > 1 ? 'Artists:' : 'Artist'}</h2>
        {song.artists?.length > 0 && song.artists.map((artist: ArtistType) => <p key={artist.id}>{artist.name}</p>)}
        <h2>Song name</h2>
        <p>{song.name}</p>
      </div>
    );
  }
  return null;
};

export default Song;
