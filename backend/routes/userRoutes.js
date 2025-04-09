import express from 'express'
import usersController from '../controllers/usersController.js'
const userRouters = express.Router()

// Route for user registration
userRouters.post('/create_user', usersController.createNewUser);

// Route for user login and logout
userRouters.post('/login', usersController.loginUser);
userRouters.post('/logout', usersController.logoutUser);

//Route to delete a user
userRouters.delete('/:id', usersController.deleteUser);


//Route to retreive a user data from the token
userRouters.get('/me', usersController.getUserFromToken);

//Route to refresh the expire token 
userRouters.get('/refresh', usersController.RefreshToken);

export default userRouters