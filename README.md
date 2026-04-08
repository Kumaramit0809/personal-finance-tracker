Readme · MD
Copy

# FinTrack — Personal Finance Tracker
 
A full-stack web application to manage your personal finances — track expenses, log income, set budgets, and get a clear picture of your money.
 
---
 
## Features
 
- **Authentication** — Register, login, forgot password, and reset password via email link
- **Dashboard** — Summary cards with income, expenses, and budget overview
- **Expenses** — Add, view, and delete expenses by category and date
- **Income** — Log income sources with frequency (one-time / recurring)
- **Budgets** — Set monthly category-wise budgets and track progress
- **Protected Routes** — All pages secured, only accessible after login
 
---
 
## Tech Stack
 
**Frontend**
- React 19, React Router DOM
- Tailwind CSS, Lucide React
- Context API (auth state)
- Vite (build tool)
 
**Backend**
- Node.js, Express.js
- MySQL (with connection pooling via mysql2)
- JWT (jsonwebtoken) for auth
- bcryptjs for password hashing
- Nodemailer for password reset emails
 
---
 
## Getting Started
 
### Prerequisites
- Node.js v18+
- MySQL
 
---
 
### Backend Setup
 
```bash
cd personal-finance-tracker-api
npm install
```
 
Create a `.env` file in the api folder:
 
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=finance_tracker
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```
 
Import the database schema:
 
```bash
mysql -u root -p < sql/schema.sql
```
 
Start the server:
 
```bash
npm run dev
```
 
---
 
### Frontend Setup
 
```bash
cd personal-finance-tracker
npm install
npm run dev
```
 
App runs at `http://localhost:5173`
 
---
 
## API Endpoints
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/forgot-password` | Send reset email |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add expense |
| DELETE | `/api/expenses/:id` | Delete expense |
| GET | `/api/incomes` | Get all incomes |
| POST | `/api/incomes` | Add income |
| GET | `/api/budgets` | Get all budgets |
| POST | `/api/budgets` | Add/update budget |

---

---
 
## Author
 
**Amit Kumar**
