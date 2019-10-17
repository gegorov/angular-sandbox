import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectFilmsToWatchList, FilmsToWatchActions } from '../store/index';
import { MovieWithCast } from '../models/index';

@Injectable()
export class FilmsToWatchStoreFacade {
    private store: Store<AppState>;

    /**
     * Observable that contain result of selectFilmsToWatchList selector
     */
    public filmsToWatch$: Observable<Array<MovieWithCast>>;

    constructor(store: Store<AppState>) {
        this.store = store;
        this.filmsToWatch$ = store.pipe(select(selectFilmsToWatchList));
    }

    public removeFilmFromList(filmToRemove: MovieWithCast): void {
        this.store.dispatch(FilmsToWatchActions.removeFilm({ film: filmToRemove }));
    }

    public addFilmToList(filmToAdd: MovieWithCast): void {
        this.store.dispatch(FilmsToWatchActions.addFilm({ film: filmToAdd }));
    }
}
