# SalesPilot Frontend

SalesPilot is a React-based admin dashboard for managing sales data. This frontend connects to the Node.js backend and provides a protected login flow, sales dashboard, and sales management interface.

## Current Scope

This repo currently covers the Week 2 frontend milestone:

- admin login screen
- protected routes
- sales dashboard shell
- summary KPI cards
- add, edit, and delete sales
- responsive sales table
- cleaner loading and error states

## Tech Stack

- React
- React Router
- Axios
- Create React App

## Routes

- `/login` - admin login page
- `/sales` - protected sales dashboard

## Local Development

### Prerequisites

- Node.js installed
- backend running from the SalesPilot backend repo

### Run the frontend

```bash
npm install
npm start
```

The frontend runs on:

- [http://127.0.0.1:3001/login](http://127.0.0.1:3001/login)

It expects the backend on:

- `http://127.0.0.1:5001`

If you open the app through your local network IP, the frontend will call that same host on port `5001`.

## Default Login

- Username: `admin`
- Password: `admin123`

## Project Structure

```text
src/
  components/
    login.js
    Sales.js
    SalesForm.js
    SalesTable.js
    Sales.css
  App.js
  App.css
  protectedRoutes.js
```

## Notes

- The dashboard currently focuses on Week 2 functionality.
- Next planned upgrades include charts, filters, export features, and AI insights.
