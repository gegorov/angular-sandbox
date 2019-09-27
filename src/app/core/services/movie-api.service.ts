// tslint:disable
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, zip } from 'rxjs';
import { map, switchMap, tap, pluck, catchError } from 'rxjs/operators';

import C from '../constants';
import { transformMovieData, transformCastData } from '../utils/index';
import { ApiResponse, ResponseMovie, Movie, MoviePersonnel, Cast, MovieWithCast, RawCast } from '../models/index';

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
  public fetchMovie(query: string): Observable<Array<MovieWithCast>> {
    const movies$: Observable<Array<MovieWithCast>> = this.http
      .get<ApiResponse>(`${C.SEARCH_URL}/search/movie`, {
        params: new HttpParams().append('api_key', C.API_KEY).append('query', query)
      })
      .pipe(
        map((response: ApiResponse) => {
          return response.results;
        }),
        map((results: Array<ResponseMovie>) => results.map(transformMovieData)),
        map(data => this.fieldMapper(data, 'posterPath')),
        switchMap(this.fetchMovieCast),
        tap(data => console.log('Data: ', data))
      );

    return movies$;
  }

  // private processMoviePosterFileds: (results: Array<Movie>) => Array<Movie> = (results: Array<Movie>) =>
  //   results.map((movie: Movie) => {
  //     if (!movie.posterPath) {
  //       return {
  //         ...movie,
  //         posterPath: 'https://via.placeholder.com/342/512'
  //       };
  //     }
  //     return {
  //       ...movie,
  //       posterPath: `${C.IMAGE_URL_W185}${movie.posterPath}`
  //     };
  //   });

  // private processCastProfileFileds: (results: Array<Cast>) => Array<Cast> = (results: Array<Cast>) =>
  //   results.map((cast: Cast) => {
  //     if (!cast.profilePath) {
  //       return {
  //         ...cast,
  //         profilePath: 'https://via.placeholder.com/45/45'
  //       };
  //     }
  //     return {
  //       ...cast,
  //       profilePath: `${C.IMAGE_URL_W45}${cast.profilePath}`
  //     };
  //   });

  private fieldMapper<T>(array: Array<T>, fieldName: keyof T): Array<T> {
    const placeholders: any = {
      profilePath: 'https://via.placeholder.com/45/45',
      posterPath: 'https://via.placeholder.com/342/512'
    };

    const imageUrls: any = {
      profilePath: C.IMAGE_URL_W45,
      posterPath: C.IMAGE_URL_W185
    };

    return array.map(
      (obj: T): T => {
        if (!obj[fieldName]) {
          return {
            ...obj,
            [fieldName]: placeholders[fieldName]
          };
        } else {
          return {
            ...obj,
            [fieldName]: `${imageUrls[fieldName]}${obj[fieldName]}`
          };
        }
      }
    );
  }

  private getMovieCast(id: number): Observable<Array<Cast>> {
    return this.http
      .get<MoviePersonnel>(`${C.SEARCH_URL}/movie/${id}/credits`, {
        params: new HttpParams().append('api_key', C.API_KEY)
      })
      .pipe(
        pluck('cast'),
        map((cast: Array<RawCast>) => cast.map(transformCastData)),
        map(data => this.fieldMapper(data, 'profilePath'))
      );
  }

  private fetchMovieCast: (data: Array<Movie>) => Observable<Array<MovieWithCast>> = (data: Array<Movie>) => {
    if (data.length) {
      // option 1
      const movieStreams$: Array<Observable<MovieWithCast>> = data.map((movie: Movie) =>
        this.getMovieCast(movie.id).pipe(
          map((cast: Array<Cast>) => ({ ...movie, cast })),
          catchError(() => of(movie as MovieWithCast))
          // tap(data => console.log(data))
        )
      );

      return zip(...movieStreams$);
    } else {
      return of([]);
    }
  };
}
