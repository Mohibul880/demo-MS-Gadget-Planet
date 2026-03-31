# MS Gadget Planet

Full-stack e-commerce starter project with:

- **Customer Website** (React + Tailwind CSS + daisyUI)
- **Admin Panel** (React + Tailwind CSS + daisyUI)
- **Backend API** (Node.js + Express + MongoDB + JWT)

## Project Structure

```text
ms-gadget-planet/
├─ apps/
│  ├─ storefront/      # Customer website
│  └─ admin-panel/     # Separate admin website
├─ server/             # API + DB + seed data
└─ docs/               # Setup notes
```

## Key Features

- Separate customer and admin applications
- 15 default products seeded from backend
- Add, edit, delete products from admin panel
- Cart with localStorage
- Order placement form
- Order management from admin panel
- Modular folder structure for easy editing
- Section comments added in code for clarity

## Default URLs

- Storefront: `http://localhost:5173`
- Admin Panel: `http://localhost:5174`
- API Server: `http://localhost:5000`

## Quick Start

### 1) Install root dependencies
```bash
npm install
```

### 2) Install app/server workspace dependencies
```bash
npm run install:all
```

### 3) Create server env
Copy `server/.env.example` to `server/.env`

### 4) Start MongoDB
Use local MongoDB or MongoDB Atlas.

### 5) Seed products
```bash
npm run seed
```

### 6) Run 3 terminals
```bash
npm run dev:server
npm run dev:storefront
npm run dev:admin
```

## Default Admin Login

Set in `server/.env`:

- `ADMIN_EMAIL=admin@msgadgetplanet.com`
- `ADMIN_PASSWORD=12345678`

## Important Notes

- Cart is stored in browser localStorage.
- Orders and products are stored in MongoDB.
- You can later deploy frontend and admin separately, both connected to the same backend API.
