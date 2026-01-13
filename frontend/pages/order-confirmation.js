import { useRouter } from 'next/router';

const OrderConfirmation = () => {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div style={styles.card}>
      <h2>Thank you for your order!</h2>
      <p>Order Received.</p>
      {orderId && <p>Order Number: {orderId}</p>}
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '420px',
    margin: '30px auto',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    textAlign: 'center'
  }
};

export default OrderConfirmation;

