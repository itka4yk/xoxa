import { Schema } from 'mongoose';

export const SpaceSchema = new Schema({
  id: String,
  name: String,
  members: [String],
  channels: [String],
});
