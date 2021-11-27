import { UnauthenticatedError } from "../errors/unauthenticated.js";
import  jwt from 'jsonwebtoken';


const checkAuthintection = (req,res,next)=>{

const authenticationHeader = req.headers.authentication;

  if(!authenticationHeader || !authenticationHeader.startsWith('Bearer ')){
      throw new UnauthenticatedError('plz register or login to be able to access this data');
  }

  const [,token] = authenticationHeader.split(' ');
    try{
       const user = jwt.verify(token, process.env.JWT_SECRET);
       req.user={userID:user.userId, name:user.name};
       next();
    }catch(error){
        throw new UnauthenticatedError('your credentials are wrong plz try again');
    }
}


export{checkAuthintection }