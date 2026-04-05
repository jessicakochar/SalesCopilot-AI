# SalesPilot

SalesPilot is a full-stack sales and admin analytics platform built as a portfolio SaaS-style project.

## Structure

- `frontend/` - React admin dashboard
- `backend/` - Node.js and Express API

## Current Progress

This project currently covers the core foundation and frontend milestone:

- admin authentication
- protected frontend routes
- sales CRUD
- quantity field support
- sales dashboard UI polish
- PostgreSQL integration
- CSV import on the backend
- logging and error handling

## Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on port `5001`.

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on port `3001`.

## Default Login

- Username: `admin`
- Password: `admin123`

## Tech Stack

- React
- Node.js
- Express
- PostgreSQL
- JWT Authentication
- Axios

## Next Planned Steps

- KPI charts and analytics
- filters and export tools
- role-based access
- Docker setup
- AI insights layer
