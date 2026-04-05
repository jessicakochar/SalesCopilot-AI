# SalesCopilot AI

SalesCopilot AI is a full-stack sales and admin analytics platform designed as a SaaS-style portfolio project. It combines a React dashboard, a Node.js API, PostgreSQL-backed sales data, and a roadmap for AI-assisted reporting and workflow automation.

## Overview

The current version delivers the operational foundation for the product:

- authenticated admin access
- protected frontend routes
- sales CRUD workflows
- quantity-aware sales records
- CSV import support on the backend
- polished dashboard UI
- logging and error handling

This repository is being developed in phases, with the next milestone focused on analytics, AI insights, and automation.

## Repository Structure

```text
SalesCopilot-AI/
  backend/
  frontend/
```

- `frontend/` contains the React admin dashboard
- `backend/` contains the Express API and PostgreSQL integration

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Create React App

### Backend

- Node.js
- Express
- PostgreSQL
- JWT authentication
- Multer
- csv-parser

## Current Features

### Frontend

- login screen with protected navigation
- sales dashboard with KPI summary cards
- add, edit, and delete sales
- quantity field support in forms and table
- responsive dashboard styling
- loading and error states

### Backend

- JWT-based login endpoint
- protected sales routes
- create, read, update, and delete sales
- CSV import endpoint
- request logging and centralized error handling

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/jessicakochar/SalesCopilot-AI.git
cd SalesCopilot-AI
```

### 2. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

### 3. Configure the backend environment

Create `backend/.env` with:

```env
PORT=5001
JWT_SECRET=your_jwt_secret
```

### 4. Prepare PostgreSQL

Make sure PostgreSQL is running and that your local database matches the backend configuration in `backend/src/config/db.js`.

If your local database was created before quantity support was added, run:

```sql
ALTER TABLE sales
ADD COLUMN IF NOT EXISTS quantity INTEGER NOT NULL DEFAULT 1;
```

### 5. Start the backend

```bash
cd backend
npm run dev
```

The API runs on `http://localhost:5001`.

### 6. Start the frontend

```bash
cd frontend
npm start
```

The dashboard runs on `http://localhost:3001`.

## Authentication

Authentication is handled with JWT. A local development admin account is configured in the backend for testing, but credentials are intentionally not documented in this README.

## API Overview

Current backend routes include:

- `POST /auth/login`
- `GET /sales`
- `GET /sales/:id`
- `POST /sales`
- `PUT /sales/:id`
- `DELETE /sales/:id`
- `POST /sales/import`

## Roadmap

- charts and trend analytics
- date and region filtering
- CSV export from the dashboard
- role-based access control
- Docker setup for local orchestration
- AI-generated sales summaries
- AI assistant workflows for sales operations

## Status

This repository currently represents the end of the frontend foundation phase and the beginning of the analytics and AI roadmap.
