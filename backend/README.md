# SalesPilot – Backend

## Overview
SalesPilot is a backend system built with Node.js and Express.js for managing sales data.  
It provides RESTful APIs for CRUD operations, supports CSV-based bulk data import, and implements JWT-based authentication with protected routes.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JSON Web Token (JWT)
- Multer
- CSV Parser
- dotenv

---

## Features

- User authentication using JWT
- Protected API routes
- CRUD operations for sales data
- CSV file upload and bulk data processing
- Error handling and logging
- RESTful API design

---

## Project Structure

```
salespilot_admin_dashboard/
├── controllers/
├── routes/
├── middleware/
├── models/
├── uploads/
├── config/
├── app.js
└── .env
```

---

## Authentication

Authentication is handled using JWT.  
Protected routes require a valid token.

Include the token in request headers:

```
Authorization: Bearer <token>
```

---

## CSV Import

The system allows uploading CSV files, which are parsed and stored in the database.

---

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/your-username/salespilot.git
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```
PORT=5000
DB_URL=your_database_url
JWT_SECRET=your_secret_key
```

### 4. Run the application

```
npm start
```

---

## API Endpoints

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`

### Sales

- GET `/api/sales`
- POST `/api/sales`
- PUT `/api/sales/:id`
- DELETE `/api/sales/:id`

### CSV Upload

- POST `/api/upload`

---

## Notes

This project demonstrates the implementation of core backend concepts including API design, authentication, file handling, and database interaction.