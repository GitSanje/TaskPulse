import "dotenv/config";
import express from "express";
import corsOptions from "./config/corsOptions.js";
import cors from "cors";
import { logger } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import userRouters from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import verifyToken from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser"


const app = express();



// Middleware Configuration
const configureMiddleware = () => {
  app.use(cookieParser())
  app.use(cors(corsOptions)); 
  app.use(logger);
  app.use(express.json()); // Parse JSON payloads from incoming requests

  app.use(errorHandler);
};


// Route Definition
const defineRoutes = () => {
  
  // Mounts all user-related routes (registration, login, profile, etc.) at /api/users
  app.use('/api/users', userRouters);

  // Mounts all task-related routes (create, update, delete tasks) at /api/tasks
  app.use('/api/tasks', verifyToken, taskRouter);

  
  
};



// Main App Initialization

const initializeApp = async () => {


  // Configure middleware
  configureMiddleware();

  // Define routes
  defineRoutes();

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
};

initializeApp()
