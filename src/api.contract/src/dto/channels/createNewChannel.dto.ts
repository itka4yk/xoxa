import { object, string } from 'joi';

export interface ICreateNewChannelDto {
  name: string;
  spaceId: string;
}

export const createNewChannelSchema = object()
  .keys({
    name: string().min(2),
    spaceId: string().min(2),
  })
  .required();
