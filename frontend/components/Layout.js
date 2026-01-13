import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <div>
      <header style={styles.header}>
        <Link href="/" style={styles.logo}>
          Hakan Pizza
        </Link>

        <nav style={styles.nav}>
          <Link href="/cart">Cart</Link>

          {isLoggedIn ? (
            <>
              <Link href="/orders">My Orders</Link>
              <button onClick={logout} style={styles.button}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      <main style={styles.main}>{children}</main>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 20px',
    background: '#111',
    color: '#fff'
  },
  nav: { display: 'flex', gap: '12px', alignItems: 'center' },
  logo: { fontWeight: 'bold', fontSize: '30px', color: '#fff' },
  button: { padding: '6px 10px', cursor: 'pointer' },
  main: { padding: '20px', maxWidth: '960px', margin: '0 auto' }
};

export default Layout;
