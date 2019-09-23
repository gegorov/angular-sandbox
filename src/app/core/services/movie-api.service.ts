import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, tap, mergeMap, switchMap } from 'rxjs/operators';

import C from '../constants';
import { transformMovieData } from '../utils/index';
import { ApiResponse, ResponseMovie, Movie, MoviePersonnel } from '../models/index';

@Injectable()
export class MovieApiService {
  /**
   * Private property for dependency injection
   */
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Fetch function to get data from API
   * @param {string} query  - search query
   */
  public fetchMovie(query: string): Observable<Array<Movie>> {
    return this.http
      .get<ApiResponse>(C.SEARCH_URL, {
        params: new HttpParams().append('api_key', C.API_KEY).append('query', query)
      })
      .pipe(
        map((response: ApiResponse) => {
          return response.results;
        }),
        map((results: Array<ResponseMovie>) => results.map(transformMovieData)),
        map((results: Array<Movie>) =>
          results.map((movie: Movie) => {
            if (!movie.posterPath) {
              return {
                ...movie,
                posterPath: 'https://via.placeholder.com/342/512'
              };
            }
            return {
              ...movie,
              posterPath: `${C.IMAGE_URL_W342}${movie.posterPath}`
            };
          })
        )
      );
  }

  private getMovieCast(id: number): Observable<MoviePersonnel> {
    return this.http
      .get<MoviePersonnel>(`${C.SEARCH_URL}/${id}/credits`, {
        params: new HttpParams().append('api_key', C.API_KEY)
      })
      .pipe(tap((data: MoviePersonnel) => console.log('Cast: ', data)));
  }
}
