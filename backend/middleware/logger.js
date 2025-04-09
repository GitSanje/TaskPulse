import { format } from 'date-fns';  
import { v4 as uuid } from 'uuid';  
import fs from 'fs';  
import { promises as fsPromises } from 'fs'; 
import path from 'path';  
import { fileURLToPath } from 'url';


// Asynchronous function to log events to a file
const logEvents = async( message, logFileName) => {

    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fullpath = path.join(__dirname, '..', 'logs');

 
    try {
         // Create "logs" directory if it doesn't exist
        if(!fs.existsSync(fullpath)){
            await fsPromises.mkdir(fullpath)
        }
         // Append the log message to the specified log file
        await fsPromises.appendFile(path.join(fullpath, logFileName), logItem)
    } catch (error) {
        console.log(error)
    }
}


// Middleware to log HTTP requests
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

export  { logEvents, logger}