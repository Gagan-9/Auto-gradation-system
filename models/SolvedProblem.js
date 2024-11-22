// import {model, models, Schema} from "mongoose";

// const SolvedProblemSchema = Schema({
//     problem: {
//       type: Schema.Types.ObjectId,
//       ref: 'Problem',
//       required: true
//     },
//     contest : {
//         type: Schema.Types.ObjectId,
//         ref: 'Contest',  
//     },
//     solution: [{
//         code: {
//             type: String,
//             required: true
//         },
//         complexity: {
//             type: [String],
//             required: true
//         },
//         submissionTime: {
//             type: Date,
//             default: Date.now
//         },
//         status: {
//             type: String,
//             enum: ['pending', 'accepted', 'rejected'],
//             default: 'pending'
//         },
//         passedTestCases: {type: Number, required: true}
//     }],
    
//     star: {type: Boolean}
//   });
  
// export const SolvedProblem = models?.SolvedProblem || model('SolvedProblem', SolvedProblemSchema);

//  // Submission.virtual('score', {
//   //   get() {
//   //     return this.passedTestCases * 100 / this.problem.testCases.length - this.executionTime / 1000;
//   //   },
//   // });





// // models/SolvedProblem.js
// import mongoose from 'mongoose';
// import { Problem } from './Problem';

// const solvedProblemSchema = new mongoose.Schema({
//   problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
//   contest: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest' },
//   solution: [
//     {
//       code: String,
//       complexity: [String],
//       submissionTime: Date,
//       status: String,
//       passedTestCases: Number,
//     }
//   ],
//   star: { type: Boolean, default: false }
// });

// const SolvedProblem = mongoose.models.SolvedProblem || mongoose.model('SolvedProblem', solvedProblemSchema);
// export { SolvedProblem };



import mongoose from 'mongoose';
import { Problem } from './Problem';


const solvedProblemSchema = new mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  contest: { type: mongoose.Schema.Types.ObjectId, ref: 'Contest' },
  solution: [
    {
      code: String,
      complexity: [String],
      submissionTime: Date,
      status: String,
      passedTestCases: Number,
    }
  ],
  star: { type: Boolean, default: false },

});

const SolvedProblem = mongoose.models.SolvedProblem || mongoose.model('SolvedProblem', solvedProblemSchema);
export { SolvedProblem };
