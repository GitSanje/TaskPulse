import asyncHandler from "express-async-handler";
import taskServices from "../services/taskServices.js";

/**
 * @desc Get all tasks
 * @route GET api/tasks
 * @access Private
 */

const getAllTasks = asyncHandler(async (req, res) => {
  // get all users from db
  const tasks = await taskServices.fetchTasks();

  // If no users
  if (!tasks.length) {
    return res.status(400).json({ status: false, message: "No tasks found" });
  }
  return res.status(201).json({ status: true, data: tasks });
});

/**
 * @desc Create a new  task
 * @route POST api/tasks/create_task
 * @access Private
 */

const createNewTask = asyncHandler(async (req, res) => {
  const { user_id, title, description, status, priority, due_date } = req.body;

  // confirm data
  if (!user_id || !title) {
    return res
      .status(400)
      .json({ message: "Please, provide required fields!" });
  }
  const taskpayload = {
    user_id,
    title,
    description,
    status,
    priority,
    due_date,
  };
  const task = await taskServices.createTask(taskpayload);

  if (!task) {
    return  res
    .status(400)
    .json({ status: false, message: "Invalid task data received" });

    
  } 
  return  res.status(201).json({
    status: true,
    message: "Task created successfully!",
  });
});



/**
 * @desc Get a task by ID
 * @route GET /api/tasks/:id
 * @access Private (Admin only or authenticated user)
 */
const getATask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task =  await taskServices.findTask('id', id);
 if(!task){
   return res.status(400).send({ status: false, message: "No task found!"});
 }
 return res.status(201).json({ status: true, data: task});

});



/**
 * @desc Deletes a task by ID
 * @route DELETE /api/tasks/:id
 * @access Private (Admin only or authenticated user)
 */
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await taskServices.deleteTask('id', id);
  return res.status(200).json({ status: true, message: "Task deleted successfully" });
});


export default { createNewTask, getAllTasks, deleteTask,getATask };
