import { object, string } from 'joi';

export const credentialsSchema = object()
  .keys({
    email: string().email(),
    password: string().min(8),
  })
  .required();
