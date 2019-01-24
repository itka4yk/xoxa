import { Schema } from 'mongoose';

export const MemberSchema = new Schema({
  id: String,
  name: String,
  userId: String,
});

export const ChannelSchema = new Schema({
  id: String,
  name: String,
});

export const SpaceSchema = new Schema({
  id: String,
  name: String,
  adminId: String,
  members: [MemberSchema],
  channels: [ChannelSchema],
});

export const MessageSchema = new Schema({
  id: String,
  spaceId: String,
  senderId: String,
  receiverId: String,
  body: String,
  timestamp: Date,
  isPrivate: Boolean,
});

export const InvitationsSchema = new Schema({
  userId: String,
  spaceId: String,
});
