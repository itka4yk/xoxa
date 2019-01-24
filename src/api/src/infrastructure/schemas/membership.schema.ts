import { Schema } from 'mongoose';

export const MembershipSchema = new Schema({
  id: String,
  userId: String,
  spaces: [String],
});
