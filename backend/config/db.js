import 'dotenv/config'
import pkg from 'pg';
const { Pool } = pkg;
import { logEvents } from '../middleware/logger.js';


// Create a new pool instance with connection details
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false // Allow SSL connections, but ignore unauthorized certificate errors
    },
    max:20
})


// Attempt to connect to the PostgreSQL database
pool.connect().then(
    () => console.log('✅ Connected to Neon PostgreSQL')
 ) .catch(err =>{
    
    logEvents( `${err.name}: ${err.message}\t${err.code}\t${err.stack}`, 'postgressErr.log')
    console.error('❌ Connection error:', err.stack)}

);


// Listen for 'error' event on idle clients

pool.on('error', (err, client) => {

    logEvents(`${err.name}: ${err.message}\t${err.stack}`, 'postgressErr.log');
    process.exit(-1); 

});


export default pool; 