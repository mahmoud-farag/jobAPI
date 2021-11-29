import { UnauthenticatedError } from "../errors/unauthenticated.js";
import  jwt from 'jsonwebtoken';


const checkAuthintection = (req,res,next)=>{

const AuthorizationHeader = req.headers.authorization;
    //    console.log(req.headers)
  if(!AuthorizationHeader || !AuthorizationHeader.startsWith('Bearer ')){
      throw new UnauthenticatedError('plz register or login to be able to access this data');
  }

  const [,token] = AuthorizationHeader.split(' ');
    try{
       const user = jwt.verify(token, process.env.JWT_SECRET);
       req.user={userID:user.userId, name:user.name};
       next();
    }catch(error){
        throw new UnauthenticatedError('your credentials are wrong plz try again');
    }
}


export{checkAuthintection }