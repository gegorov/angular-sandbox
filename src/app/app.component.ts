import { Component } from '@angular/core';
import { MovieApiService } from './core/services/movie-api.service';
import { ApiResponse, Movies } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** Title of the application */
  public title: string = 'IMDB (almost :)';

  /** used as a storage for value riecived from child input */
  public value: string = '';

  /** used to store fetched results */
  public movies: Movies[] = [];

  /** used to store error messages */
  public errors: string[] = [];

  /** variable to trigger loading indicator */
  public loading: boolean = false;

  constructor(private movieApiService: MovieApiService) {}

  /**
   * Listener for data emited from child input to set emitted value to lacal variable
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
    this.loading = true;
    this.movieApiService.fetchMovie(searchQuery).subscribe(
      (data: ApiResponse) => {
        this.movies = data.results as Movies[];
        this.loading = false;
      },
      (error: Error) => {
        this.errors.push(error.message);
        this.loading = false;
      }
    );
  }
}
