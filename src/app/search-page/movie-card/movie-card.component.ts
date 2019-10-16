import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { MovieWithCast, AppState, FilmsToWatchActions } from '../../core/index';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent {
    /**
     * input prop for displaying in template
     */
    @Input() public movie: MovieWithCast;

    constructor(private store: Store<AppState>) {}

    /**
     * Function that fires eiter add or remove film action
     * @param {MatCheckboxChange} event
     */
    public onChange(event: MatCheckboxChange): void {
        if (event.checked) {
            this.store.dispatch(FilmsToWatchActions.addFilm({ film: this.movie }));
        } else {
            this.store.dispatch(FilmsToWatchActions.removeFilm({ film: this.movie }));
        }
    }
}
