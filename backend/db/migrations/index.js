import pool from '../../config/db.js'
import { logEvents } from '../../middleware/logger.js'

import createUsersTable from './1_create_accounts_table.js'
import createTasksTable from './2_create_tasks_table.js'


const runDBMigrations = async() => {
   
    console.log('====================================');
    console.log("BEGIN DB MIGRATION");
    console.log('====================================');

    // Get a single-use client from the pool
    const client = await pool.connect()

    try {
        // start a transaction
        await client.query('BEGIN')
     // Add a unique constraint to prevent duplicate tasks for the same user on the same due date

      //   await client.query(
      //     ALTER TABLE tasks
      //     ADD CONSTRAINT unique_user_task UNIQUE (user_id, title, due_date);
      // `);

          // Run the migrations
        await client.query(createUsersTable);
        await client.query(createTasksTable);

        // Commit the transaction if everything succeeds
        await client.query('COMMIT')
        console.log('====================================');
        console.log(" MIGRATION SUCCEED");
        console.log('====================================');
    } catch (error) {
      // Rollback the transaction in case of an error
        await client.query('ROLLBACK')
        console.log('====================================');
        console.log('DB migration failed');
        console.log('====================================');
       // logEvents(`${error.name}: ${error.message}\t${error.stack}`, 'migrationError.log');
    }finally {
        // Release the client back to the pool
        client.release()
    }

}

export default runDBMigrations;