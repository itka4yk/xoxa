import { object, string } from 'joi';

export interface ICreateNewSpaceDto {
  name: string;
  adminName: string;
}

export const createNewSpaceSchema = object()
  .keys({
    name: string().min(2),
    adminName: string().min(2),
  })
  .required();
