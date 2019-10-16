import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, MovieWithCast, selectFilmsToWatchList, FilmsToWatchActions } from '../core/index';

@Component({
    selector: 'app-films-to-watch',
    templateUrl: './films-to-watch.component.html',
    styleUrls: ['./films-to-watch.component.scss']
})
export class FilmsToWatchComponent implements OnInit {
    /**
     * variable to store slice of the store and pass it to component
     */
    public movies$: Observable<Array<MovieWithCast>>;

    private store: Store<AppState>;

    constructor(store: Store<AppState>) {
        this.store = store;
    }

    /**
     * Function that triggers action to remove movie from store
     * @param {MovieWithCast} movie
     */
    onClick(movie: MovieWithCast): void {
        console.log('id: ', movie);
        this.store.dispatch(FilmsToWatchActions.removeFilm({ film: movie }));
    }

    ngOnInit(): void {
        this.movies$ = this.store.pipe(select(selectFilmsToWatchList));
    }
}
