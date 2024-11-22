// models/Submission.js
import { model, models, Schema } from 'mongoose';

const SubmissionSchema = new Schema({
  userEmail: { type: String, required: true },
  problemTitle: { type: String, required: true },
  status: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User
  problem: { type: Schema.Types.ObjectId, ref: 'Problem' }, // Reference to Problem
}, { timestamps: true });

export const Submission = models?.Submission || model('Submission', SubmissionSchema);
