# MERN To-Do App

This is a full-stack MERN to-do application built as a learning project. It started from basic Express APIs and grew into a proper authenticated CRUD app with MongoDB, React Router, JWT authentication, bcrypt password hashing, and user-owned tasks.

## Tech Stack

- MongoDB: database for users and tasks
- Express.js: backend API server
- React: frontend UI
- Node.js: backend runtime
- Mongoose: MongoDB object modeling
- React Router: frontend page routing
- JWT: authentication tokens
- bcrypt: password hashing
- Vite: React development/build tool

## Project Structure

```txt
ToDo App/
  client/
    src/
      pages/
        Login.jsx
        Signup.jsx
        Todo.jsx
      api.js
      App.jsx
  server/
    config/
      db.js
    controllers/
      taskControllers.js
      userControllers.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
    models/
      Task.js
      User.js
    routes/
      tasksRoutes.js
      userRoutes.js
    backend.js
```

## What We Built

### Backend

- Created an Express server.
- Connected Express to local MongoDB using Mongoose.
- Moved database connection logic into `server/config/db.js`.
- Used environment variables from `.env`.
- Created separate route files for tasks and users.
- Created controller files for task logic and user/auth logic.
- Added centralized error middleware.
- Added authentication middleware for protected routes.

### MongoDB Models

Created a `User` model with:

- `name`
- `email`
- `password`

Created a `Task` model with:

- `title`
- `completed`
- `userId`

The `userId` field connects each task to the user who created it.

### Authentication

Implemented signup and login.

Signup flow:

```txt
read name/email/password
validate required fields
check if email already exists
hash password with bcrypt
save user in MongoDB
```

Login flow:

```txt
read email/password
find user by email
compare password using bcrypt
create JWT token
send token to frontend
```

### JWT Authorization

Protected task APIs using JWT.

Frontend sends:

```txt
Authorization: Bearer <token>
```

Backend middleware:

```txt
reads Authorization header
extracts token
verifies token
gets userId from decoded token
adds req.userId
allows controller to continue
```

This lets controllers know which logged-in user is making the request.

### User-Owned Tasks

Task APIs are protected and user-specific:

```txt
GET    /api/tasks       -> gets only logged-in user's tasks
POST   /api/tasks       -> creates task for logged-in user
PATCH  /api/tasks/:id   -> updates only logged-in user's task
DELETE /api/tasks/:id   -> deletes only logged-in user's task
```

We used queries like:

```js
Task.find({ userId: req.userId });
```

and:

```js
Task.findOneAndUpdate(
  { _id: taskId, userId: req.userId },
  { completed: status },
  { returnDocument: "after" }
);
```

This prevents one user from accessing or modifying another user's tasks.

## Frontend

Created React pages:

- `Login.jsx`
- `Signup.jsx`
- `Todo.jsx`

Used React Router:

```txt
/signup -> signup page
/login  -> login page
/       -> protected todo page
```

Implemented protected frontend routing:

```txt
no token -> redirect to /login
token exists -> show todo page
```

Used `localStorage` to keep the user logged in after refresh.

Logout removes the token:

```txt
remove token from localStorage
clear token state
clear tasks
show login page again
```

## API Helper File

Moved frontend `fetch()` calls into:

```txt
client/src/api.js
```

This file contains helper functions for:

- login
- signup
- get tasks
- create task
- update task
- delete task

This keeps `App.jsx` cleaner and separates API communication from UI/routing logic.

## Main Concepts Learned

- Express routes and controllers
- Middleware
- Error handling
- MongoDB persistence
- Mongoose schemas and models
- ObjectId relationships
- Async/await and promises
- REST APIs
- HTTP status codes
- Request body, params, headers, and custom request fields
- CORS
- React state
- React forms
- Controlled inputs
- Conditional rendering
- React Router
- JWT authentication
- bcrypt password hashing
- Protected backend APIs
- Protected frontend routes
- User-specific data ownership
- Frontend API abstraction

## How To Run

Start MongoDB locally first.

Start backend:

```bash
cd "/Users/pradyumna/Projects/ToDo App/server"
node backend.js
```

Start frontend:

```bash
cd "/Users/pradyumna/Projects/ToDo App/client"
npm run dev
```

Then open the frontend URL shown by Vite, usually:

```txt
http://localhost:5173
```

## Environment Variables

Server `.env` should contain:

```txt
MONGO_URI=mongodb://127.0.0.1:27017/myapp
EXPRESS_PORT=5001
JWT_SECRET=your_secret_key
```

`.env` should not be committed to Git. Use `.env.example` to show required variable names.

## Final Status

This project is now a complete MERN to-do application with authentication and user-owned CRUD functionality. It is a strong foundation for learning more advanced topics like validation libraries, refresh tokens, deployment, testing, and cleaner state management with custom hooks.
