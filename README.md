# Hakan Pizza - Next.js & Express & MongoDB

İki parçalı (frontend + backend) pizza restoranı örnek projesi. Özellikler:
- Kayıt / giriş (JWT)
- Pizza menüsü listeleme
- Sepet yönetimi
- Kapıda ödeme seçeneğiyle sipariş oluşturma

## Proje yapısı
```
backend/   -> Express API (auth, pizzas, orders)
frontend/  -> Next.js (login, register, menü, sepet, siparişler)
```

## Backend (Express)
Ortam değişkeni örneği: `backend/env.sample` dosyasını `.env` olarak kopyalayın.
```bash
cd backend
npm install
cp env.sample .env   # gerekirse düzenleyin
npm run dev          # localhost:5001
```

### API uçları
- `POST /api/auth/register` { name, email, password }
- `POST /api/auth/login` { email, password } -> { token }
- `GET /api/pizzas`
- `POST /api/orders` (Bearer token) body: { items: [{ pizzaId, quantity }], paymentMethod: 'cash' }
- `GET /api/orders/me` (Bearer token)

## Frontend (Next.js)
```bash
cd frontend
npm install
export NEXT_PUBLIC_API_URL=http://localhost:5001/api
npm run dev          # localhost:3000
```

Sayfalar:
- `/` menü, sepete ekleme
- `/login` giriş
- `/register` kayıt
- `/cart` sepet ve sipariş oluşturma
- `/orders` geçmiş siparişler
- `/order-confirmation` sipariş sonucu

## Notlar
- MongoDB varsayılan bağlantı: `mongodb://localhost:27017/hakanpizza`
- JWT saklama: frontend localStorage, isteklerde Authorization: Bearer {token}
- `backend/src/controllers/pizzaController` ilk istek geldiğinde örnek pizza kayıtları ekler.

