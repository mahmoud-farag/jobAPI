import {Job} from '../models/job.js'
import httpStatusCodes from 'http-status-codes';
import { BadRequestError } from '../errors/bad-request.js';
import { InternalServerError } from '../errors/internalServer.js';
const { StatusCodes } = httpStatusCodes;

// /api/v1/jobs/  route controller
const getAllJobs =async (req, res)=>{

    const {userID:userId} = req.user;
    console.log(userId)
    try {
        const jobs = await Job.find({createdBy:userId});
        if(!jobs){
          res.status(StatusCodes.NO_CONTENT).send(`no jobs  was found for this user: ${userId} `)
        }
        res.status(StatusCodes.OK).send({jobs, numJobs: jobs.length})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
    }
}   

// /api/v1/jobs/  route controller
const postNewJob = async (req, res)=>{  

          req.body.createdBy = req.user.userID
        // try{
            // const newJob = {company,position,createdBy: userID}
          const createdJob = await Job.create(req.body)
          res.status(StatusCodes.OK).send(createdJob);
    //   }catch(error){
    //     //   res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
    //      throw new InternalServerError(error.message)
        
    //   }
 }   

// /api/v1/jobs/:id  route controller
const getJob = async (req, res)=>{
                
    try{
      const job= await Job.find({userID:req.params.id, createdBy: req.user.userID});
      if(!job){
        throw new Error(`no jobs found  for this user: ${req.user.name}`)
    }  
      res.status(StatusCodes.OK).send(job);
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)

    } 

    // res.send('get single job by id');

}

// /api/v1/jobs/  route controller
const updateJob= async (req, res)=>{
         const {company, postion} = req.body;
      try{
         const updatedJob = await Job.findOneAndUpdate(
                            {userID:req.params.id, createdBy:req.user.userID},
                            {company, postion},
                            { new: true, runValidators: true })
            if(!updatedJob){
                throw new Error(`no jobs found to be update for this user: ${req.user.name}`)
            }                
        res.status(StatusCodes.OK).send(updatedJob);
     
      }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
      }
    // res.send('update single job')


}

const deleteJob = async(req, res)=>{
      try {
            const deletedJob =  await Job.findByIdAndRemove({userID:req.params.id, createdBy:req.user.userID});
            if(!deletedJob){
                throw new Error(`no jobs found to be delete for this user: ${req.user.name}`)
            }   
            res.status(StatusCodes.OK).send(deletedJob);
      }catch(error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
      }
    // res.send('delete single job controller')
}

export {
    getAllJobs,
    postNewJob,
    getJob,
    updateJob,
    deleteJob,
}