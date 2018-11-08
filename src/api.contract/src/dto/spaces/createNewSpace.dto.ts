import { object, string } from 'joi';

export interface ICreateNewSpaceDto {
  name: string;
}

export const createNewSpaceSchema = object().keys({
  name: string().min(2),
}).required();
