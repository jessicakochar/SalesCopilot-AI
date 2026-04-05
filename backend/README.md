# SalesPilot Backend

SalesPilot Backend is the Node.js and Express API for SalesCopilot AI. It manages authentication, sales data, CSV import, and database access for the admin dashboard.

## Current Scope

- JWT-based authentication
- protected sales routes
- create, read, update, and delete sales
- quantity support on sales records
- CSV import endpoint
- request logging
- centralized error handling

## Stack

- Node.js
- Express
- PostgreSQL
- JWT
- Multer
- csv-parser
- dotenv

## Project Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    routes/
  sql/
  package.json
```

## Setup

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create `.env`:

```env
PORT=5001
JWT_SECRET=your_secret_key
```

Database connection values are currently defined in `src/config/db.js`.

### Run the API

```bash
npm run dev
```

The backend runs on `http://localhost:5001`.

## Routes

- `POST /auth/login`
- `GET /sales`
- `GET /sales/:id`
- `POST /sales`
- `PUT /sales/:id`
- `DELETE /sales/:id`
- `POST /sales/import`

## Database Notes

If your local database was created before quantity support was added, run the migration in `sql/add_quantity_to_sales.sql`.

## Authentication

Protected routes require a valid JWT in the request header:

```text
Authorization: Bearer <token>
```

Development credentials are configured locally and are intentionally not documented in this README.
