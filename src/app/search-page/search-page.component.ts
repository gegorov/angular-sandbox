import { Component } from '@angular/core';
import { MovieApiService } from '../core/index';
import { Movie } from '../core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  /**
   * Private property for dependency injection
   */
  private movieApiService: MovieApiService;

  /**
   * Title of the application
   */
  public title: string = 'IMDB (almost :)';

  /**
   * used as a storage for value received from child input
   */
  public value: string = '';

  /**
   *  used to store fetched results
   */
  public movies$!: Observable<Array<Movie>>;

  /**
   * used to store error messages
   */
  public errors: Array<string> = [];

  /**
   *  variable to trigger loading indicator
   */
  public loading: boolean = false;

  constructor(movieApiService: MovieApiService) {
    this.movieApiService = movieApiService;
  }

  /**
   * Listener for data emitted from child input to set emitted value to local variable
   * @param {string} value - data from input
   */
  public onNotify(value: string): void {
    this.value = value;
    this.searchMovie(value);
  }
  /**
   * Function that triggers fetch from movieApiService and also handles loading indicator state
   * @param {string} searchQuery search query
   */
  public searchMovie(searchQuery: string): void {
    this.loading = true;
    this.movies$ = this.movieApiService.fetchMovie(searchQuery);
    this.loading = false;
  }
}
