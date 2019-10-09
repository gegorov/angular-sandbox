import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, mergeMap, delay } from 'rxjs/operators';

import C from '../constants';

export class ApiInterceptor implements HttpInterceptor {
    private apiDebnounceTime: number = 0;
    private resetTime: number;

    private counter: number = 0;

    /**
     * In this method we are listening to all requests and responces. We take x-ratelimit-reset header
     * from 21st api call to setup a delay time in order to fit the API requirements of 40 calls in 10 seconds
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return of(req).pipe(
            tap((event: HttpRequest<any>) => {
                if (event instanceof HttpRequest) {
                    this.counter++;
                }
                if (this.counter === 21 && this.resetTime) {
                    this.apiDebnounceTime = Number(this.resetTime) * C.MILLISECONDS - Date.now();
                    this.counter = 0;
                }
            }),
            delay(this.apiDebnounceTime),
            mergeMap(() =>
                next.handle(req).pipe(
                    tap((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse && event.headers) {
                            this.resetTime = Number(event.headers.get(C.RESPONSE_HEADER_WITH_RESET_TIME) as string);
                        }
                    })
                )
            )
        );
    }
}
