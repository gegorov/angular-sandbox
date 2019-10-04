// tslint:disable
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, zip, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap, pluck, catchError, filter, scan } from 'rxjs/operators';

import C from '../constants';
import { transformMovieData, transformCastData } from '../utils/index';
import { ApiResponse, ResponseMovie, Movie, MoviePersonnel, Cast, MovieWithCast, RawCast } from '../models/index';

@Injectable()
export class MovieApiService {
  /**
   * Private property for dependency injection
   */
  private http: HttpClient;

  /**
   * initial value for $page subject
   */
  private pageInitialValue = 1;

  /**
   * varibale to store a behaviorsubject that controls page number
   */
  private page$: BehaviorSubject<number>;

  /**
   * variable to store time of first fetch
   */
  private fetchTimeMiliseconds: Date;

  /**
   * interval for debouncing
   */
  private debounceInterval: number = 10000;
  /**
   * current page indicator
   */
  private currentPage: number = 0;
  /**
   * total number of pages, used to determine whether you need to show load more button
   */
  private totalPages: number = 0;

  /**
   * Subject that is used to handle search queries
   */
  public query$: BehaviorSubject<string> = new BehaviorSubject('');
  /**
   * public variable that is used in template of search page as a condition to show Load more button
   */
  public isNextPage = false;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Function that fetches data
   * @param query - search query
   * @param page  - page number for server request
   */
  private getData(query: string, page: number): Observable<Array<MovieWithCast>> {
    return this.http
      .get<ApiResponse>(`${C.SEARCH_URL}/search/movie`, {
        params: new HttpParams()
          .append('api_key', C.API_KEY)
          .append('query', query)
          .append('page', `${page}`),
      })
      .pipe(
        tap(() => {
          this.fetchTimeMiliseconds = new Date();
        }),
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

        switchMap(this.fetchMovieCast)
      );
  }

  /**
   * function that returns a stream
   */
  public getMoviesStream(): Observable<Array<MovieWithCast>> {
    return this.query$.pipe(
      filter((query: string) => !!query),

      switchMap((query: string) => {
        this.page$ = new BehaviorSubject(this.pageInitialValue);
        return this.page$.pipe(
          switchMap((pageNumber: number) => this.getData(query, pageNumber)),
          scan((acc, resp) => [...acc, ...resp], [] as Array<MovieWithCast>)
        );
      })
    );
  }

  /**
   * function to get new page and fire new value to $page subject
   */
  public getNextPage(): void {
    if (this.totalPages > this.currentPage) {
      const difference = Date.now() - this.fetchTimeMiliseconds.getTime();
      console.log('diff: ', difference);

      const delay = difference > this.debounceInterval ? 0 : this.debounceInterval - difference + 1;
      console.log('delay: ', delay);

      setTimeout(() => {
        this.page$.next(++this.currentPage);
      }, delay);
    }
  }

  /**
   * Function that creates full image url and assign it to the passed array of objects
   * @param {Array<Movie | Cast>} array
   * @param {string} fieldName
   */
  private fieldMapper<T>(array: Array<T>, fieldName: keyof T): Array<T> {
    const placeholders: any = {
      profilePath: C.PLACEHOLDER_PROFILE,
      posterPath: C.PLACEHOLDER_POSTER,
    };

    const imageUrls: any = {
      profilePath: C.IMAGE_URL_W45,
      posterPath: C.IMAGE_URL_W185,
    };

    return array.map(
      (obj: T): T => {
        if (!obj[fieldName]) {
          return {
            ...obj,
            [fieldName]: placeholders[fieldName],
          };
        } else {
          return {
            ...obj,
            [fieldName]: `${imageUrls[fieldName]}${obj[fieldName]}`,
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
    const keyToPluck = 'cast';
    return this.http
      .get<MoviePersonnel>(`${C.SEARCH_URL}/movie/${id}/credits`, {
        params: new HttpParams().append('api_key', C.API_KEY),
      })
      .pipe(
        pluck(keyToPluck),
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
      const movieStreams$: Array<Observable<MovieWithCast>> = data.map((movie: Movie) =>
        this.getMovieCast(movie.id).pipe(
          map((cast: Array<Cast>) => ({ ...movie, cast })),
          catchError(() => of(movie as MovieWithCast))
        )
      );

      return zip(...movieStreams$);
    } else {
      return of([]);
    }
  };
}
