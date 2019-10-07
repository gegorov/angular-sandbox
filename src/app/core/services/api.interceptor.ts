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
import { tap } from 'rxjs/operators';

export class ApiInterceptor implements HttpInterceptor {
  //   /**
  //  * The request was sent out over the wire.
  //  */
  // Sent = 0,
  // /**
  //  * An upload progress event was received.
  //  */
  // UploadProgress = 1,
  // /**
  //  * The response status code and headers were received.
  //  */
  // ResponseHeader = 2,
  // /**
  //  * A download progress event was received.
  //  */
  // DownloadProgress = 3,
  // /**
  //  * The full response including the body was received.
  //  */
  // Response = 4,
  // /**
  //  * A custom event from an interceptor or a backend.
  //  */
  // User = 5

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
        console.log('event: ', event);
      })
    );
  }
}
