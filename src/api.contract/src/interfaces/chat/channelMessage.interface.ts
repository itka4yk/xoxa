export interface IMessage {
  senderId: string;
  receiverId: string;
  body: string;
  timestamp: Date;
  // message is private by default
  isPrivate: boolean | true;
}
