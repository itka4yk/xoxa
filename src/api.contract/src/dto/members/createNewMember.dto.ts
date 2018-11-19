import { object, string } from 'joi';

export interface ICreateNewMember {
  spaceId: string;
  name: string;
}

export const createNewMemberSchema = object()
  .keys({
    spaceId: string().min(2),
    name: string().min(2),
  })
  .required();
