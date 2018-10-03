import {tap} from 'rxjs/operators';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoggerService} from '../services/logger.service';

export class TimingInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next
      .handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            LoggerService.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
          }
        }));
  }
}
