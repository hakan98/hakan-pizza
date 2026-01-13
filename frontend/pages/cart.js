import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCart } from '../components/CartContext';
import { OrderService } from '../lib/api';

const Cart = () => {
  const { items, removeItem, clear, total } = useCart();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setError(null);
  }, [items]);

  const placeOrder = async () => {
    if (!items.length) {
      setError('Sepet boş');
      return;
    }

    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('token')
        : null;

    if (!token) {
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      // ✅ BACKEND MODELİNE UYUMLU PAYLOAD
      const payload = {
        items: items.map((item) => ({
          pizzaId: item._id,      // ✅ Backend expects pizzaId
          name: item.name,      // snapshot
          price: item.price,    // snapshot
          quantity: item.quantity
        })),
        paymentMethod: 'cash'
      };

      const res = await OrderService.create(payload);

      clear();
      router.push(`/order-confirmation?orderId=${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Cart</h2>

      {!items.length && <p>Cart is empty</p>}

      {items.map((item) => (
        <div key={item._id} style={styles.row}>
          <div>
            <strong>{item.name}</strong> x {item.quantity}
          </div>
          <div>{item.price * item.quantity} CHF</div>
          <button onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <h3>Total: {total} CHF</h3>

          <button onClick={placeOrder} disabled={loading}>
            {loading ? 'Sending...' : 'Order with Cash on Delivery'}
          </button>

          <button onClick={clear} style={{ marginLeft: 8 }}>
            Clear Cart
          </button>
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

const styles = {
  row: {
    background: '#fff',
    padding: '10px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.08)'
  }
};

export default Cart;
