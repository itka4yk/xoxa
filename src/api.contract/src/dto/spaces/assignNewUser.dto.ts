import { object, string } from 'joi';

export interface IAssignNewUserDto {
  spaceId: string;
  userId: string;
  applierId: string;
}

export const assignNewUserSchema = object().keys({
  spaceId: string().min(2),
  userId: string().min(2),
}).required();
