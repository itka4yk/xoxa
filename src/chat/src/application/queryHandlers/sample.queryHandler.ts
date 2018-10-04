import { SampleQuery } from '../queries/sample.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(SampleQuery)
export class SampleQueryHandler implements IQueryHandler<SampleQuery, string> {
  execute(query: SampleQuery): Promise<string> {
    return new Promise((res) => res('hello from the other side'));
  }
}
