import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, selectFilmsToWatchList } from '../core/store/index';
import { MovieWithCast } from '../core/index';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-films-to-watch',
    templateUrl: './films-to-watch.component.html',
    styleUrls: ['./films-to-watch.component.scss']
})
export class FilmsToWatchComponent implements OnInit {
    public movies$: Observable<Array<MovieWithCast>>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.movies$ = this.store.pipe(
            select(selectFilmsToWatchList),
            tap(data => console.log('data: ', data))
        );
    }
}
