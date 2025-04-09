import 'dotenv/config'
import jwt from 'jsonwebtoken'
import userServices from '../services/userServices.js';
/**
 * @desc Middleware to verify JWT from cookies and attach the user to the request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
const verifyToken = async (req, res, next) => {
    try {
      // Read the token from the HTTP-only cookie
       const token = req.cookies?.accessToken;
     
      if (!token) {
        return res.status(401).send({
          status: false,
          message: "Unauthorized User, No Token"
        });
      }
  
      // Verify Token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
      // Get User from Token
      req.user = await userServices.findUser('id', userId);
  
      if (!req.user) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized User, User not found"
        });
      }
  
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        status: false,
        message: "Unauthorized User"
      });
    }
  };

  export default verifyToken;