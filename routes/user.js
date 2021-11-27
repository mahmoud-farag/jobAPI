import express from 'express';
import { login, register } from '../controllers/user.js';

const userRoute = express.Router();




userRoute.route('/register').post(register);
userRoute.route('/login').post(login)





export {userRoute}



