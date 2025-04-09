
import express from 'express'
import tasksController from '../controllers/tasksController.js';

const taskRouter = express.Router()

// Route to fetch all tasks
taskRouter.get('/', tasksController.getAllTasks);

// Route to fetch single task
taskRouter.get('/:id', tasksController.getATask);

// Route for task creation
taskRouter.post('/create_task', tasksController.createNewTask);

// Route for task deletion
taskRouter.delete('/:id', tasksController.deleteTask);

export default taskRouter;

