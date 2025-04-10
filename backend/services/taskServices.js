
import pool from "../config/db.js"
import { deleteOne, findOne,findItemsBy } from "../lib/util.js";




class TaskService {
    constructor() {
        
      }
/**
 * @desc This method is used to create a new task in the `tasks` table.
 *       It inserts task data linked to a user and returns the created task's details.
 * @param {string} user_id - The ID of the user creating the task.
 * @param {string} title - The title of the task.
 * @param {string} description - The task description.
 * @param {string} status - The current status of the task (e.g., 'pending', 'completed').
 * @param {string} priority - The priority level of the task (e.g., 'low', 'high').
 * @param {string} due_date - The due date for the task in ISO format.
 * @returns {Promise<object>} - Returns the newly created task's details.
 */
async createTask(taskObj) {
    const {user_id, title, description, status, priority, due_date} = taskObj;
    const query = `
        INSERT INTO tasks (user_id, title, description, status, priority, due_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (user_id, title, due_date)  DO UPDATE SET id = tasks.id
        RETURNING id, user_id, title, description, status, priority, due_date
        `;

  
    const values = [user_id, title, description, status, priority, due_date];
    console.log(taskObj);
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the created task data
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Error creating task');
    }
  }
  

   // Method to fetch all tasks
   async fetchTasks() {
    const query = `
    SELECT * FROM tasks
  `;
    
    try {
      const result = await pool.query(query);
      return result.rows; // Return an array of task objects
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Error fetching tasks');
    }
  }

  /**
   * @desc Finds a task in the 'tasks' table 
   * @param {string} key - The column name to search by (e.g., 'id', 'email')
   * @param {any} value - The value to match against the specified key
   * @returns {Promise<Object|null>} The task object 
   */
  async findTask(key, value) {
    const task = await findOne('tasks', key, value);
    return task;
  }

  /**
 * @desc Finds all tasks belonging to a user
 * @param {string} userId
 * @returns {Promise<Array>} List of tasks
 */
async findTasksByUserId(userId) {
  return await findItemsBy("tasks", "user_id", userId); 
}


  /**
   * @desc Deletes a task in the 'tasks' table 
   * @param {string} key - The column name to search by (e.g., 'id', 'email')
   * @param {any} value - The value to match against the specified key
   * @returns {Promise<Object|null>} The task object 
   */

  async deleteTask(key, value) {
    const isDelete = await deleteOne('tasks', key, value);
    return isDelete;
  }


  
  

}

export default new TaskService();