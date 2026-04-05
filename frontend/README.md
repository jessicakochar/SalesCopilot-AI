# SalesPilot Frontend

SalesPilot Frontend is the React admin interface for SalesCopilot AI. It provides the login flow, protected routes, sales dashboard, and day-to-day record management experience.

## Current Scope

This package currently covers the frontend foundation milestone:

- login screen
- protected routing
- sales dashboard layout
- KPI summary cards
- add, edit, and delete sales
- quantity field support
- responsive sales table
- loading and error states

## Stack

- React
- React Router
- Axios
- Create React App

## Routes

- `/login`
- `/sales`

## Local Development

### Install

```bash
npm install
```

### Run

```bash
npm start
```

The frontend runs on `http://localhost:3001`.

It expects the backend on `http://localhost:5001`, or the same host on port `5001` when accessed through a local network IP.

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

- Development credentials are configured locally in the backend and are intentionally not listed here.
- Next planned upgrades include charts, filters, export features, and AI-assisted insights.
