import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, selectFilmsToWatchList } from '../core/store/index';
import { MovieWithCast } from '../core';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-films-to-watch',
    templateUrl: './films-to-watch.component.html',
    styleUrls: ['./films-to-watch.component.scss']
})
export class FilmsToWatchComponent {
    public movies: Array<MovieWithCast>;
    constructor(private store: Store<State>) {
        store.pipe(select(selectFilmsToWatchList)).subscribe(filmsToWatch => (this.movies = filmsToWatch));
    }
}
