export interface IMySpace {
  id: string;
  name: string;
  adminId: string;
  channels: { id: string; name: string }[];
  members: { id: string; userId: string; name: string }[];
}
