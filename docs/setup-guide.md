# Setup Guide

## Needed Tools
- Node.js 20+
- npm
- MongoDB local or Atlas

## How the connection works
- The **customer site** fetches products and submits orders to the backend.
- The **admin panel** logs in to the backend and manages products/orders.
- The **backend** connects both websites through one API.

## Environment
Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ms-gadget-planet
JWT_SECRET=supersecretkey
ADMIN_EMAIL=admin@msgadgetplanet.com
ADMIN_PASSWORD=12345678
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```
