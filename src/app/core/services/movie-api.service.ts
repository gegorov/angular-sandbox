// tslint:disable
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, zip, BehaviorSubject } from 'rxjs';
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

  private pageInitialValue = 1;
  private page$: BehaviorSubject<number> = new BehaviorSubject(this.pageInitialValue);

  private currentPage: number = 0;
  private totalPages: number = 0;

  public isNextPage = false;
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
        tap((data: ApiResponse) => {
          if (data.total_pages && data.page && data.total_pages > data.page) {
            this.isNextPage = true;
            this.currentPage = data.page;
            this.totalPages = data.total_pages;
          } else {
            this.isNextPage = false;
          }
        }),
        map((response: ApiResponse) => {
          return response.results;
        }),
        map((results: Array<ResponseMovie>) => results.map(transformMovieData)),
        map(data => this.fieldMapper(data, 'posterPath')),
        switchMap(this.fetchMovieCast),
        tap(data => console.log('Data: ', data))
      );

    return this.page$.pipe(
      tap(value => console.log('subject value: ', value)),
      tap(() => {
        this.isNextPage = false;
      }),
      switchMap(() => {
        return movies$;
      })
    );
  }

  public getNextPage(): void {
    if (this.totalPages > this.currentPage) {
      this.page$.next(++this.currentPage);
    }
  }

  /**
   * Function that creates full image url and assign it to the passed array of objects
   * @param {Array<Movie | Cast>} array
   * @param {string} fieldName
   */
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

  /**
   * Funciton that fetches cast for given movie id
   * @param {number} id
   */
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

  /**
   * Funciton that return a stream with array of observables that consist of movies cast
   * @param {number} id
   */
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
