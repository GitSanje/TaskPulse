

const createUsersTable = `
CREATE TABLE IF NOT EXISTS accounts (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255)  NOT NULL,
     first_name VARCHAR(255)  NOT NULL,
     last_name VARCHAR(255)  NOT NULL,
     profile_url VARCHAR(255) NULL,
     role VARCHAR(255)  DEFAULT 'user',
     created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
)
`

export default createUsersTable