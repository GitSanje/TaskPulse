const createTasksTable =
 `CREATE TABLE IF NOT EXISTS tasks (
   id SERIAL PRIMARY KEY,
   user_id INT NOT NULL,   
   title VARCHAR(255) NOT NULL,
   description TEXT,
   status VARCHAR(255) NOT NULL DEFAULT 'pending',
   priority VARCHAR(50) DEFAULT 'medium', 
   due_date TIMESTAMPTZ,
   created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
   deleted_at TIMESTAMPTZ,
   CONSTRAINT  fk_user  FOREIGN KEY (user_id) REFERENCES accounts(id) ON DELETE CASCADE

)`;


export default createTasksTable