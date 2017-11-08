import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ProgressBarService} from '../../core/progress-bar.service';

export class ProgressInterceptor implements HttpInterceptor {
  constructor(private progressBarService: ProgressBarService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBarService.increase();
    return next
      .handle(req)
      .do(event => {
        if (event instanceof HttpResponse) {
          this.progressBarService.decrease();
        }
      });
  }
}
