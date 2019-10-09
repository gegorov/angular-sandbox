import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../core/index';
import { MovieWithCast } from '../core/models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
    /**
     * public property for dependency injection
     */
    public movieApiService: MovieApiService;

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
    public movies$!: Observable<Array<MovieWithCast>>;

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

    ngOnInit(): void {
        this.movies$ = this.movieApiService.getMoviesStream();
    }
    /**
     * Listener for data emitted from child input to set emitted value to local variable
     * @param {string} value - data from input
     */
    public onNotify(value: string): void {
        this.movieApiService.showLoader();
        this.value = value;
        this.searchMovie(value);
    }

    /**
     * function to load more data from the server
     */
    public loadMore(): void {
        this.movieApiService.showLoader();
        this.movieApiService.getNextPage();
    }
    /**
     * Function that triggers fetch from movieApiService and also handles loading indicator state
     * @param {string} searchQuery search query
     */
    private searchMovie(searchQuery: string): void {
        this.movieApiService.query$.next(searchQuery);
    }
}
