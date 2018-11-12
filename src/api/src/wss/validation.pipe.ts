import * as Joi from 'joi';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly schema) {
  }

  transform({ data }: any, metadata: ArgumentMetadata) {
    console.log('VALUE', data);
    const { error } = Joi.validate(data, this.schema, { presence: 'required' });
    if (error) {
      console.log('ERROR', error);
      throw new BadRequestException('Validation failed');
    }
    return data;
  }
}
