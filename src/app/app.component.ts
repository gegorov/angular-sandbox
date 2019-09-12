import { Component } from '@angular/core';
import { MovieApiService } from './core/services/movie-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** used as a storage for value riecived from child input */
  public title: string = 'IMDB (almost :)';
  public value: string = '';

  constructor(private movieApiService: MovieApiService) {}

  /**
   * Listener for data emited from child input to set emitted value to lacal variable
   * @param {string} value - data from input
   */
  public onNotify(value: string): void {
    this.value = value;
    this.searchMovie(value);
  }

  public searchMovie(searchQuery: string) {
    this.movieApiService
      .fetchMovie(searchQuery)
      .subscribe(data => console.log('DATA: ', data), error => console.log('ERROR: ', error.message));
  }
}
