import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import C from '../constants';

export interface ApiResponse {
  page?: number;
  results?: [];
  total_results?: number;
  total_pages?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  constructor(private http: HttpClient) {}

  public fetchMovie(query: string): Observable<ApiResponse> {
    console.log('Query: ', query);
    return this.http.get<ApiResponse>(C.SEARCH_URL).pipe(
      map(response => {
        console.log('Response : ', response);
        return response.results;
      })
    );
  }
}
