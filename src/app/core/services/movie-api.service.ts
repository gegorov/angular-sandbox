import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';

import C from '../constants';
import { ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  constructor(private http: HttpClient) {}

  /**
   * Fecht function to get data from API
   * @param {string} query  - search query
   */
  public fetchMovie(query: string): Observable<ApiResponse> {
    console.log('Query: ', query);
    return this.http
      .get<ApiResponse>(C.SEARCH_URL, {
        params: new HttpParams().append('api_key', C.API_KEY).append('query', query)
      })
      .pipe(
        tap((response: ApiResponse) => console.log('response: ', response)),
        delay(500),
        catchError((error: Error) => {
          console.log('Error: ', error.message);
          return throwError(error);
        })
      );
  }
}
