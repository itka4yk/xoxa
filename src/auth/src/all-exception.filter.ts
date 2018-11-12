import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcFilter implements RpcExceptionFilter {
  catch(exception: RpcException): Observable<any> {
    return throwError(exception.getError());
  }
}
