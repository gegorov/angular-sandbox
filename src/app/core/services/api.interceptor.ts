import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';

export class ApiInterceptor implements HttpInterceptor {
  private apiDebnounceTime: number = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        // if (event.type === HttpEventType.ResponseHeader) {
        //   console.log('Headers', event);
        // }
        // if (event.type === HttpEventType.Response) {
        //   console.log('INTERCEPTOR RESPONSE EVENT', event);
        // }
        // const { headers } = event;

        // if (headers) {
        //   console.log('headers:', headers);
        //   // headers.foreach(header => {
        //   //   console.log('Header: ', header);
        //   // });
        // }

        if (event instanceof HttpResponse && event.headers) {
          const resetTime: string = event.headers.get('x-ratelimit-reset');
          const rateLimit: string = event.headers.get('x-ratelimit-remaining');
          console.log('rate limit: ', rateLimit);
          console.log('reset time: ', resetTime);
          if (rateLimit === '1') {
            this.apiDebnounceTime = +resetTime - Date.now();
          }
        }
      }),
      debounceTime(this.apiDebnounceTime),
      tap(() => {
        this.apiDebnounceTime = 0;
      })
    );
  }
}
