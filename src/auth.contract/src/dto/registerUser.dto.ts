import { IRole } from '../interfaces/role.interface';
import { object, string } from 'joi';

export const newUserDtoSchema = object().keys({
  email: string().email(),
  password: string().min(8)
}).required();
