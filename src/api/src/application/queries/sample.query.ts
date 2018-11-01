import { IQuery } from '@nestjs/cqrs';

export class SampleQuery implements IQuery<string> {}