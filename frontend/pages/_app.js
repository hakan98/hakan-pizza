import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { CartProvider } from '../components/CartContext';
import '../styles.css';

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <CartProvider>
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Component
          {...pageProps}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;