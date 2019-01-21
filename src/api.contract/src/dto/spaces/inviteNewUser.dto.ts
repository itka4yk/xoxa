import { object, string } from 'joi';

export interface IInviteNewUserDto {
  spaceId: string;
  userEmail: string;
  applierId: string;
}

export const inviteNewUserSchema = object()
  .keys({
    spaceId: string().min(2),
    userEmail: string().min(2),
  })
  .required();
