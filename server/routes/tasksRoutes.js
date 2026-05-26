import express from 'express';
import { getTasks, postTasks, patchTasks, deleteTasks } from '../controllers/taskControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const taskRouter = express.Router();

taskRouter.get("/", authMiddleware,getTasks);
taskRouter.post("/", authMiddleware,postTasks);
taskRouter.patch("/:id", authMiddleware,patchTasks);
taskRouter.delete("/:id", authMiddleware,deleteTasks);
export default taskRouter;