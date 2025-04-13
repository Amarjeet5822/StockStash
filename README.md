# StockStash
StockStash is a full-stack web application designed to help users manage their stock portfolios, search for stocks, and make informed investment decisions. The application consists of a **Frontend** built with React and Redux and a **Backend** powered by Node.js, Express, and MongoDB.

---

## Features

### Frontend
1. **User Authentication**:
  - Login and Signup functionality with email and password.
  - Google OAuth integration for seamless login.

2. **Dashboard**:
  - A landing page showcasing trending stocks and market overviews.

3. **Search Stocks**:
  - Search for stocks by name or symbol with a debounce feature for optimized performance.
  - View stock details, including price, market cap, and other key metrics.

4. **Portfolio Management**:
  - View your portfolio allocation with a pie chart.
  - Analyze your holdings with detailed metrics such as average price, current value, and returns.

5. **Trade Stocks**:
  - Buy and sell stocks directly from the application.

6. **Error Handling**:
  - A 404 error page for non-existent routes.

7. **Responsive Design**:
  - Fully responsive UI for desktop and mobile devices.

---

### Backend
1. **User Authentication**:
  - Secure login and signup with hashed passwords using bcrypt.
  - Google OAuth integration for authentication.
  - JWT-based session management with refresh tokens.

2. **Stock Management**:
  - Fetch all stocks or a specific stock by ID.
  - Manage stock data in the database.

3. **Portfolio Management**:
  - Buy and sell stocks with automatic calculation of average price and total shares.
  - Fetch user portfolio with enriched data like current value and returns.

4. **Middleware**:
  - Authentication middleware to protect routes.
  - Error handling middleware for consistent error responses.

5. **Database**:
  - MongoDB for storing user, stock, and portfolio data.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Redux Toolkit**: For state management.
- **React Router**: For routing.
- **Tailwind CSS**: For styling.
- **Recharts**: For data visualization (pie charts).
- **Axios**: For making API requests.

### Backend
- **Node.js**: For server-side logic.
- **Express**: For building RESTful APIs.
- **MongoDB**: For database management.
- **Passport.js**: For authentication (Google OAuth).
- **JWT**: For secure session management.
- **Mongoose**: For MongoDB object modeling.

---

## Installation and Setup

Follow these steps to set up the project locally:

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (running locally or a cloud instance)
- A `.env` file with the following variables:
  ```
  # Backend Environment Variables
  MONGO_URI=<your_mongodb_connection_string>
  JWT_SECRET=<your_jwt_secret>
  GOOGLE_CLIENT_ID=<your_google_client_id>
  GOOGLE_CLIENT_SECRET=<your_google_client_secret>
  ```

#### Backend Setup
1. Navigate to the `backend` directory:
  ```bash
  cd backend
  ```
2. Install dependencies:
  ```bash
  npm install
  ```
3. Start the backend server:
  ```bash
  npm start
  ```
  The server will run on `http://localhost:8080` by default.

#### Frontend Setup
1. Navigate to the `frontend` directory:
  ```bash
  cd frontend
  ```
2. Install dependencies:
  ```bash
  npm install
  ```
3. Start the development server:
  ```bash
  npm start
  ```
  The application will run on `http://localhost:5173` by default.

#### Running the Application
1. Ensure MongoDB is running and the `.env` file is correctly configured.
2. Start both the backend and frontend servers as described above.
3. Open your browser and navigate to `http://localhost:5173` to access the application.

#### Additional Scripts
- **Backend**:
  - `npm run dev`: Start the backend server in development mode with hot-reloading.
- **Frontend**:
  - `npm run build`: Build the frontend for production.

---
