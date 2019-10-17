import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { MovieWithCast, FilmsToWatchStoreFacade } from '../core/index';

@Component({
    selector: 'app-films-to-watch',
    templateUrl: './films-to-watch.component.html',
    styleUrls: ['./films-to-watch.component.scss']
})
export class FilmsToWatchComponent {
    private filmsToWatchStoreFacade: FilmsToWatchStoreFacade;

    /**
     * variable to store slice of the store and pass it to component
     */
    public movies$: Observable<Array<MovieWithCast>>;

    constructor(filmsToWatchStoreFacade: FilmsToWatchStoreFacade) {
        this.filmsToWatchStoreFacade = filmsToWatchStoreFacade;
        this.movies$ = filmsToWatchStoreFacade.filmsToWatch$;
    }

    /**
     * Function that triggers action to remove movie from store
     * @param {MovieWithCast} movie
     */
    public onClick(movie: MovieWithCast): void {
        this.filmsToWatchStoreFacade.removeFilmFromList(movie);
    }
}
