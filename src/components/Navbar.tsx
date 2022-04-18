import Link from 'next/link';
import { useRouter } from 'next/router';

type NavbarProps = {
  loggedIn: boolean;
  logOut: () => void;
};

const Navbar = ({ loggedIn, logOut }: NavbarProps) => {
  const { pathname } = useRouter();
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/playing">Now playing</Link>
      <Link href="/playlists">Playlists</Link>
      {loggedIn && <button onClick={logOut}>Log out</button>}
      {!loggedIn && pathname !== '/login' && <Link href="/login">Login</Link>}
    </>
  );
};

export default Navbar;
