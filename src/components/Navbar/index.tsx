import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './navbar.module.css';

type NavbarProps = {
  loggedIn: boolean;
  logOut: () => void;
};

const Navbar = ({ loggedIn, logOut }: NavbarProps) => {
  const { pathname } = useRouter();
  return (
    <nav className={styles.Navigation}>
      <ul className={styles.NavigationItems}>
        <li className={styles.item}>
          <Link href="/">Home</Link>
        </li>
        {loggedIn && (
          <>
            <li className={styles.item}>
              <Link href="/playing">Now playing</Link>
            </li>
            <li className={styles.item}>
              <Link href="/playlists">Playlists</Link>
            </li>
          </>
        )}
        <li className={styles.logItem}>
          {loggedIn && <p onClick={logOut}>Log out</p>}
          {!loggedIn && pathname !== '/login' && <Link href="/login">Login</Link>}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
