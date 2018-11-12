import { Schema } from 'mongoose';

export const ChannelSchema = new Schema({
  id: String,
  name: String,
  spaceId: String,
});
