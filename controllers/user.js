import httpStatusCodes from 'http-status-codes';
import { BadRequestError } from '../errors/bad-request.js';
import { User } from '../models/user.js';
const {StatusCodes} = httpStatusCodes

const register =async (req,res)=>{
           
    try {
        const user =  await User.create({...req.body});
        const token =  user.generateToken();
        res.status(StatusCodes.CREATED).send({name:user.name,  token});   
    } catch (error) {
          throw new Error(error)
    }
         
}


const login = async(req,res)=>{
    const { email, password} =  req.body;
    if(!email || !password){
        throw new BadRequestError('plz provide write credentials');
    }
    try{
        const user = await User.findOne({email});
        const isCorrectPassword = await user.comparePassword(password);
    
          if(!isCorrectPassword){
              throw new BadRequestError('plz provide a correct password');
          }
        const token =  user.generateToken(); 
        res.send( {name:user.name, token});
    }catch(error){
       
        throw new BadRequestError(error.message);
    }
   
    
}













































export {
    register, 
    login
}