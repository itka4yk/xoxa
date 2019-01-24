import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
  id: String,
  senderId: String,
  receiverId: String,
  body: String,
  timestamp: Date,
  isPrivate: Boolean,
  spaceId: String,
});
