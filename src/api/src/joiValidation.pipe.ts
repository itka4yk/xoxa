import * as Joi from 'joi';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('VALUE', value);
    const { error } = Joi.validate(value, this.schema, { presence: 'required' });
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}