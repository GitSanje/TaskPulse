
import 'dotenv/config'
import format from 'pg-format';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken'


/**
 * @desc Check for duplicate entry in a table based on key-value pair
 * @param {string} tableName - The table name to check
 * @param {string} key - The column to check for duplicates
 * @param {string} value - The value to check for duplication
 * @returns {boolean} - Returns true if a duplicate exists, otherwise false
 */

export const checkDuplicate = async ( tableName, key, value) =>{

    const query = format(`
        SELECT COUNT(*) FROM %I WHERE %I = $1
      `, tableName, key); 
      
    const values = [value];
    try {
        const result = await pool.query(query, values);
        const count = parseInt(result.rows[0].count, 10);
        
        return count > 0;  // If count is greater than 0, the value exists (duplicate)
    } catch (error) {
        console.error(`Error checking for duplicate ${key}:`, error);
    throw new Error(`Error checking duplicate ${key}`);
    }
}



/**
 * @desc Retrieves column names from a PostgreSQL table excluding specific fields
 * @param {string} tableName - The name of the table
 * @param {string[]} excludedFields - List of fields to exclude
 * @returns {Promise<string>} A comma-separated string of column names
 */
const getSelectableColumns = async (tableName, excludedFields) => {
  const columnsRes = await pool.query(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = $1
  `, [tableName]);

  const columns = columnsRes.rows.map(row => row.column_name);
  return columns.filter(col => !excludedFields.includes(col)).join(', ');
};




/**
 * @desc Finds a single row in a table by a specific key-value pair, with optional field exclusion
 * @param {string} tableName - The name of the table to query
 * @param {string} key - The column name to filter by (e.g., 'email', 'id')
 * @param {any} value - The value to match for the key
 * @param {string[]} [excludedFields=[]] - Optional fields to exclude from the result (e.g., ['password'])
 * @returns {Promise<Object|null>} The found row, or null if not found
 */
export const findOne = async (tableName, key, value, excludedFields = []) => {
  try {
    let selectedCols = '*';

    if (excludedFields.length > 0) {
      selectedCols = await getSelectableColumns(tableName, excludedFields);
    }

    const query = format(`SELECT ${selectedCols} FROM %I WHERE %I = $1 LIMIT 1`, tableName, key);
    const result = await pool.query(query, [value]);

    return result.rows[0] || null;
  } catch (err) {
    console.error('Error in findOne:', err);
    throw new Error('Unable to fetch data.');
  }
};



/**
 * @desc Deletes a single row from a table by a specific key-value pair
 * @param {string} tableName - The name of the table to delete from
 * @param {string} key - The column name to filter by (e.g., 'id', 'email')
 * @param {any} value - The value to match for the key
 * @returns {Promise<boolean>} True if a row was deleted, false otherwise
 */
export const deleteOne = async (tableName, key, value) => {
  try {
    const query = format(`DELETE FROM %I WHERE %I = $1`, tableName, key);
    const result = await pool.query(query, [value]);

    return result.rowCount > 0;
  } catch (err) {
    console.error('Error in deleteOne:', err);
    throw new Error('Unable to delete record.');
  }
};



/**
 * @desc Generates an access token for a user
 * @param {Object} user - The user data to generate the token for
 * @returns {string} The generated access token (JWT)
 */
export const generateAccessToken = (user) => {
    return jwt.sign({
      userId: user.id,
      username: user.username? user.username: user.first_name+'_'+user.last_name,
      email: user.email,
      profile_url: user.profile_url || null
    }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
}

/**
 * @desc Generates a refresh token for a user
 * @param {Object} user - The user data to generate the token for
 * @returns {string} The generated refresh token (JWT)
 */
export const generateRefreshToken = (user) => {
  return jwt.sign({
    userId: user.id,
    username: user.username? user.username: user.first_name+'_'+user.last_name,
    email: user.email,
    profile_url: user.profile_url || null
  }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
  
};

/**
 * Extracts and verifies a JWT token.
 * @param token - The JWT string from cookies.
 * @returns The decoded user payload if valid, otherwise null.
 */
export const extractDataFromToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) ;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

/**
 * @desc Fetches all items belonging to a specific attribute( e.g, user)
 * @param {string} tableName - The name of the table to delete from
 * @param {string} key - The column name to filter by (e.g., 'id', 'email')
 * @param {any} value - The value to match for the key
 * @returns {Promise<Array>} - List of items 
 */


export const findItemsBy = async (tableName, key, value, excludedFields = []) => {
  try {
    let selectedCols = '*';

    if (excludedFields.length > 0) {
      selectedCols = await getSelectableColumns(tableName, excludedFields);
    }

    const query = format(
      `SELECT ${selectedCols} FROM %I WHERE %I = $1 ORDER BY created_at DESC`,
      tableName,
      key
    );

    const result = await pool.query(query, [value]);
    return result.rows;
  } catch (err) {
    console.error('Error in findTasksByUser:', err);
    throw new Error('Unable to fetch tasks for the user.');
  }
};


/**
 * Updates a record in the specified table based on the provided `key` and `value` 
 * and updates it with the fields and values provided in `updatedData`.
 * 
 * @param {string} tableName - The name of the table to update.
 * @param {string} key - The column name to match against for the WHERE condition.
 * @param {string} value - The value of the `key` to identify the record to update.
 * @param {object} updatedData - An object containing the fields to be updated with their new values.
 * @returns {Promise<object | null>} - The updated row if successful, or null if no rows were affected.
 * 
 * @example
 * const updatedRow = await update('users', 'id', 1, { name: 'John Doe', email: 'john.doe@example.com' });
 * console.log(updatedRow);
 */
export const update = async (tableName, key, value, updatedData) => {
  // Extract fields and their corresponding values from the updatedData object
  const fields = Object.keys(updatedData);
  const values = Object.values(updatedData);

  // Construct the SET clause for the SQL query
  const setClause = fields
    .map((field, index) => format('%I = $%s', field, index + 1))
    .join(', ');
  console.log(setClause);
  
  // Format the SQL query string
  const query = format(
    `UPDATE %I SET ${setClause} WHERE %I = $%s RETURNING *`,
    tableName,
    key,
    fields.length + 1 
  );

  // Execute the query using the formatted SQL string and provided values
  const result = await pool.query(query, [...values, value]);

  // Return the updated row if the update was successful, or null if no rows were affected
  return result.rowCount > 0 ? result.rows[0] : null;
};
