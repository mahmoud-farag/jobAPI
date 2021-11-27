import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,// every time  a job created.... it will be assigned to the created user id 
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', JobSchema);

export {Job};
