import { Schema } from 'mongoose';

export const MemberSchema = new Schema({
  userId: String,
  id: String,
  name: String,
  spaceId: String,
});
