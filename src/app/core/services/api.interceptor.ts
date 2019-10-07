import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, mergeMap, delay } from 'rxjs/operators';

export class ApiInterceptor implements HttpInterceptor {
  private apiDebnounceTime: number = 0;
  private resetTime: number;

  private counter: number = 0;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(req).pipe(
      tap((event: HttpRequest<any>) => {
        console.log(`this reset time:  ${this.resetTime}, this.counter: ${this.counter}`);
        if (event instanceof HttpRequest) {
          this.counter++;
        }
        if (this.counter === 21 && this.resetTime) {
          this.apiDebnounceTime = Number(this.resetTime) * 1000 - Date.now();
          console.log('API DEBOUNCE TIME: ', this.apiDebnounceTime);
          this.counter = 0;
        }
      }),
      tap(() => {
        console.log('before debounceTime: ', this.apiDebnounceTime);
      }),
      delay(this.apiDebnounceTime),
      mergeMap(() =>
        next.handle(req).pipe(
          tap(() => {
            console.log(`apiDebouncetime ${this.apiDebnounceTime}, counter: ${this.counter}`);
          }),
          tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse && event.headers) {
              this.resetTime = Number(event.headers.get('x-ratelimit-reset') as string);
            }
          })
        )
      )
    );
  }
}
