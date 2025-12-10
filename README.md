# Store-Front Service

Customer-facing web application for Algonquin Pet Store.

## Technology Stack

- Next.js 14
- React 18
- TypeScript
- Axios for API calls

## Features

- Browse products
- View product details
- Add products to cart
- Place orders

## Local Development

```bash
npm install
npm run dev
```

Application will be available at http://localhost:3000

## Environment Variables

- `NEXT_PUBLIC_PRODUCT_SERVICE_URL`: Product service URL (default: http://localhost:3001)
- `NEXT_PUBLIC_ORDER_SERVICE_URL`: Order service URL (default: http://localhost:3002)

## Docker Build

```bash
docker build -t store-front:latest .
docker run -p 3000:3000 store-front:latest
```

## Health Check

```bash
curl http://localhost:3000/health
```

