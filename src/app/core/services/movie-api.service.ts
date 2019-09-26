// tslint:disable
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, from, zip } from 'rxjs';
import { map, switchMap, tap, pluck, mergeMap, scan, catchError } from 'rxjs/operators';

import C from '../constants';
import { transformMovieData } from '../utils/index';
import { ApiResponse, ResponseMovie, Movie, MoviePersonnel, Cast } from '../models/index';

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
    const movies$: Observable<Array<Movie>> = this.http
      .get<ApiResponse>(`${C.SEARCH_URL}/search/movie`, {
        params: new HttpParams().append('api_key', C.API_KEY).append('query', query)
      })
      .pipe(
        map((response: ApiResponse) => {
          return response.results;
        }),
        map((results: Array<ResponseMovie>) => results.map(transformMovieData)),
        map(this.processMoviePosterFileds),
        switchMap((data: Array<Movie>) => {
          if (data.length) {
            // option 1
            const movieStreams: Array<Observable<Movie>> = data.map((movie: Movie) =>
              this.getMovieCast(movie.id).pipe(map((cast: Cast) => ({ ...movie, cast }), catchError(err => of(movie))))
            );

            return zip(...movieStreams);

            // option 2

            // return from(data).pipe(
            //   mergeMap((movie: Movie) =>
            //     this.getMovieCast(movie.id).pipe(map((cast: Array<Cast>) => ({ ...movie, cast })))
            //   ),
            //   scan(
            //     (acc: Array<Movie>, movieWithCast: Movie) => {
            //       console.log('acc', acc);
            //       console.log('movie', movieWithCast);
            //       return [...acc, movieWithCast];
            //     },
            //     [] as Array<Movie>
            //   )
            // );
          } else {
            return of([]);
          }
        }),
        tap(data => console.log('Data: ', data))
        // switchMap(({ id } => {}))
      );

    // const cast$: Observable<Array<Cast>> = movies$.pipe(
    //   switchMap((movie: Movie) => this.getMovieCast(movie.id)),
    //   tap((data: Array<Cast>) => console.log('data inside cast$: ', data))
    // );

    return movies$;
  }

  // private processCast = id => {
  //   const casts = this.getMovieCast(id);
  //   return zip(casts);
  // };

  private processMoviePosterFileds: (results: Array<Movie>) => Array<Movie> = (results: Array<Movie>) =>
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
    });

  private getMovieCast(id: number): Observable<Array<Cast>> {
    return this.http
      .get<MoviePersonnel>(`${C.SEARCH_URL}/movie/${id}/credits`, {
        params: new HttpParams().append('api_key', C.API_KEY)
      })
      .pipe(
        tap((data: MoviePersonnel) => console.log('Cast: ', data)),
        pluck('cast')
      );
  }
}
