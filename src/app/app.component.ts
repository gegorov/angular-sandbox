import { Component } from '@angular/core';
import { MovieApiService } from './core/index';
import { Movie } from './core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** Title of the application */
  public title: string = 'IMDB (almost :)';

  /** used as a storage for value received from child input */
  public value: string = '';

  /** used to store fetched results */
  public movies$!: Observable<Array<Movie>>;

  /** used to store error messages */
  public errors: Array<string> = [];

  /** variable to trigger loading indicator */
  public loading: boolean = false;

  /**
   * Private property for dependency injection
   */
  private movieApiService: MovieApiService;

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
   * Function that trigers fetch from movieApiService and also handles loading indicator state
   * @param {string} searchQuery search query
   */
  public searchMovie(searchQuery: string): void {
    this.errors = [];
    if (searchQuery) {
      this.loading = true;
      this.movies$ = this.movieApiService.fetchMovie(searchQuery);
      this.loading = false;
    } else {
      this.errors.push('Search Query should not be empty');
    }
  }
}
