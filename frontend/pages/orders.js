import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { OrderService } from '../lib/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const loadOrders = async () => {
    try {
      const res = await OrderService.myOrders(); // ✅ DOĞRU ENDPOINT
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDeliver = async (orderId) => {
    try {
      await OrderService.markDelivered(orderId);
      loadOrders();
    } catch (err) {
      console.error(err);
      alert('Failed to update order status');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    loadOrders();
  }, []);

  const activeOrders = orders.filter(o => o.status !== 'delivered');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');

  return (
    <div>
      <h3>Active Orders</h3>
      {!activeOrders.length && <p>No active orders.</p>}
      {activeOrders.map(order => (
        <OrderCard key={order._id} order={order} onDeliver={handleDeliver} />
      ))}

      <h3>Past Orders (Delivered)</h3>
      {!deliveredOrders.length && <p>No delivered orders yet.</p>}
      {deliveredOrders.map(order => (
        <OrderCard key={order._id} order={order} />
      ))}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

const OrderCard = ({ order, onDeliver }) => (
  <div style={styles.card}>
    <div>
      <strong>{new Date(order.createdAt).toLocaleString()}</strong> — {order.status}
    </div>
    <div>Total: {order.totalPrice} CHF</div>
    <ul>
      {order.items.map(item => (
        <li key={item._id}>
          {item.name} x {item.quantity} = {item.price * item.quantity} CHF
        </li>
      ))}
    </ul>
    {onDeliver && order.status !== 'delivered' && (
      <button
        className="deliver-btn"
        onClick={() => onDeliver(order._id)}
      >
        Delivered
      </button>
    )}
  </div>
);

const styles = {
  card: {
    background: '#fff',
    padding: '14px',
    paddingBottom: '50px',
    borderRadius: '10px',
    marginBottom: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    position: 'relative'
  }
};

export default Orders;
