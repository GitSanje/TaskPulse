import runDBMigrations from "./db/migrations/index.js";

// Run the migration function
runDBMigrations().catch((error) => {
    console.error('Migration failed:', error);
});




