# RNT Backend – Expense Tracker API

Node.js + Express + MongoDB REST API for the **Personal Expense Tracker** React Native mobile app.

Live deployment: https://rnt-backend.vercel.app/

Frontend repo: https://github.com/TheLunatic1/RNT

## Features

- **JWT Authentication**
  - Register new users
  - Login with email/password
  - Token-based protected routes
- **Expense CRUD**
  - Create, read, update, delete expenses
  - Each expense belongs to a user and category
- **Category Management**
  - Create categories (user-specific)
  - List all categories for authenticated user
- **MongoDB with Mongoose**
  - Schemas for User, Expense, Category
  - Proper indexing & validation
- **Security**
  - Password hashing (bcrypt)
  - JWT token verification middleware
  - Route protection
- **Serverless-ready**
  - Deployed on Vercel as Serverless Functions
  - No persistent server needed
- **CORS & Error Handling**
  - Proper CORS headers for React Native frontend
  - Consistent error responses

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- dotenv (environment variables)
- Vercel (serverless deployment)
- MongoDB Atlas (cloud database)

## Prerequisites

- Node.js ≥ 18
- npm / yarn
- MongoDB Atlas account (free tier works)
- Git

## Setup (Local Development)

1. Clone the repo

   ```bash
   git clone https://github.com/YOUR_USERNAME/rnt-backend.git
   cd rnt-backend
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create `.env` file in root

   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/expense-tracker?retryWrites=true&w=majority
   JWT_SECRET=your-very-long-random-secret-key-here
   ```

   - Replace `<user>`, `<password>`, and cluster URL with your MongoDB Atlas connection string
   - Generate a strong `JWT_SECRET` (e.g. via `openssl rand -base64 32`)

4. Start development server

   ```bash
   npm run dev
   # or
   node index.js
   ```

   Server should run at `http://localhost:5000`

5. Test endpoints (use Postman / Thunder Client / curl)

   - POST `/api/auth/register` → create user
   - POST `/api/auth/login` → get token
   - GET `/api/expenses` → (with `x-auth-token` header)

## API Endpoints

| Method | Endpoint                        | Description                          | Auth Required |
|--------|---------------------------------|--------------------------------------|---------------|
| POST   | `/api/auth/register`            | Register new user                    | No            |
| POST   | `/api/auth/login`               | Login & get JWT token                | No            |
| GET    | `/api/categories`               | Get all categories of the user       | Yes           |
| POST   | `/api/categories`               | Create new category                  | Yes           |
| GET    | `/api/expenses`                 | Get all expenses of the user         | Yes           |
| POST   | `/api/expenses`                 | Create new expense                   | Yes           |
| PUT    | `/api/expenses/:id`             | Update expense                       | Yes           |
| DELETE | `/api/expenses/:id`             | Delete expense                       | Yes           |

Request body examples:

**Register**
```json
{
  "name": "Salman",
  "email": "salman@example.com",
  "password": "strongpassword123"
}
```

**Login**
```json
{
  "email": "salman@example.com",
  "password": "strongpassword123"
}
```

**Create Expense**
```json
{
  "description": "Lunch",
  "amount": 250,
  "category": "Food",
  "date": "2025-02-28"
}
```

All protected routes require header:

```
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Deployment (Vercel)

This backend is deployed as **Vercel Serverless Functions**.

1. Push to GitHub
2. Import repo in Vercel dashboard
3. Add environment variables in Vercel → Settings → Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Deploy → auto-detected as Node.js project
5. Done — URL will be something like `https://rnt-backend.vercel.app`


## Folder Structure

```
.
├── routes/
│   ├── auth.js
│   ├── expenses.js
│   └── categories.js
├── models/
│   ├── User.js
│   ├── Expense.js
│   └── Category.js
├── middleware/
│   └── auth.js               # JWT verification
├── .env                      # local only
├── package.json
└── ...
```

## Future / Planned Improvements

- Input validation (express-validator / Joi)
- Rate limiting (express-rate-limit)
- More detailed error responses
- Pagination for expenses list
- Category delete / update endpoints
- Monthly / yearly summary endpoints
- Export expenses as CSV endpoint
- Refresh token support
- OAuth (Google login)
- Webhook / real-time (if needed later)

## Security Notes

- Never commit `.env`
- Use strong `JWT_SECRET`
- Always validate & sanitize inputs
- Consider adding helmet.js for headers
- MongoDB connection should use TLS (Atlas default)

## License

MIT — feel free to use, modify, distribute.

Made by Lunatic1  
Frontend: https://github.com/TheLunatic1/RNT  