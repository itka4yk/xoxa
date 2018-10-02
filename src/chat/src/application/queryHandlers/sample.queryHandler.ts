import { IQueryHandler, QueryHandler } from '../QueryBus';
import { SampleQuery } from '../queries/sample.query';

@QueryHandler(SampleQuery)
export class SampleQueryHandler implements IQueryHandler<SampleQuery, string> {
  execute(query: SampleQuery, resolve: (value?: any) => void): string {
    return 'hello from the other side';
  }
}
