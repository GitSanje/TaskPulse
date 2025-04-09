
import pool from "../config/db.js"
import { checkDuplicate, deleteOne, findOne } from "../lib/util.js";



class UserService {
    constructor() {
        
      }

    // Method to create a new user

    /**
 * @desc This method is used to create a new user in the `users` table.
 *       It takes user information, inserts it into the database, 
 *       and returns the newly created user's details.
 * @params {string} email - The email address of the user.
 * @params {string} password - The user's password (hashed before saving).
 * @params {string} firstName - The user's first name.
 * @params {string} lastName - The user's last name.
 * @returns {object} - Returns the created user's details (id, email, first name, last name).
 */
  async createUser(email, password, firstName, lastName) {
    const query = `
      INSERT INTO accounts (email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, first_name, last_name
    `;
    const values = [email, password, firstName, lastName];

    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the created user data
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  }

   // Method to fetch all users
   async fetchUsers() {
    const query = `
    SELECT id, email, first_name, last_name, profile_url FROM accounts
  `;
    
    try {
      const result = await pool.query(query);
      return result.rows; // Return an array of user objects
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Error fetching users');
    }
  }

  /**
 * @desc Check if the email already exists in the accounts table
 * @route Helper function to check for duplicate emails
 * @params {string} value - The email to check for duplication
 * @returns {boolean} - Returns true if the email exists, false otherwise
 */
  // Method to check if there exists duplicate email
  async checkEmail(value){
    const isexists = await checkDuplicate('accounts','email',value)
    console.log(isexists,'from userservice');
    return  isexists
  }
  
  /**
   * @desc Finds a user in the 'accounts' table 
   * @param {string} key - The column name to search by (e.g., 'id', 'email')
   * @param {any} value - The value to match against the specified key
   * @returns {Promise<Object|null>} The user object 
   */
  async findUser(key, value) {
    const user = await findOne('accounts', key, value);
    return user;
  }

  /**
   * @desc Deletes a user in the 'accounts' table 
   * @param {string} key - The column name to search by (e.g., 'id', 'email')
   * @param {any} value - The value to match against the specified key
   * @returns {Promise<Object|null>} The user object 
   */

  async deleteUser(key, value) {
    const isDelete = await deleteOne('accounts', key, value);
    return isDelete;
  }
  

}

export default new UserService();