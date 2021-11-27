import express from 'express';
import {  getAllJobs,
    postNewJob,
    getJob,
    updateJob,
    deleteJob, } from '../controllers/jobs.js';

const jobRouter = express.Router();


jobRouter.route('/').get(getAllJobs).post(postNewJob)
jobRouter.route('/:id').get(getJob)
                           .patch(updateJob)
                           .delete(deleteJob)


export {jobRouter};