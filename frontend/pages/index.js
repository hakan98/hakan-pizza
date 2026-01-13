import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PizzaService } from '../lib/api';
import { useCart } from '../components/CartContext';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    PizzaService.list()
      .then((res) => setPizzas(res.data))
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Menü yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Pizza Menu</h1>
      <div style={styles.grid}>
        {pizzas.map((pizza) => (
          <div key={pizza._id} style={styles.card}>
            {pizza.imageUrl ? (
              <div style={{ marginBottom: '15px' }}>
                <Image
                  src={pizza.imageUrl}
                  alt={pizza.name}
                  width={260}
                  height={200}
                  style={{ borderRadius: '8px', width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </div>
            ) : null}
            <h3 style={{ margin: '0 0 10px 0' }}>{pizza.name}</h3>
            <p style={{ color: '#666', marginBottom: '15px', flex: 1 }}>{pizza.description}</p>
            <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>{pizza.price} CHF</p>
            <button onClick={() => addItem(pizza)} className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px', padding: '20px' },
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.2s ease',
    border: '1px solid #eaeaea'
  }
};

export default Home;

