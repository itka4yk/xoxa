import * as Joi from 'joi';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class WssValidationPipe implements PipeTransform {
  constructor(private readonly schema) {}

  transform({ data }: any, metadata: ArgumentMetadata) {
    const { error } = Joi.validate(data, this.schema, { presence: 'required' });
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return data;
  }
}
