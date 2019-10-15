import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MovieWithCast } from '../../core/index';
import { Store } from '@ngrx/store';
import { State } from 'src/app/core/store';
import { AddFilm, RemoveFilm } from 'src/app/core/store/actions/films-to-watch.actions';
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

    constructor(private store: Store<State>) {}

    public onChange(event: MatCheckboxChange): void {
        if (event.checked) {
            this.store.dispatch(new AddFilm(this.movie));
        } else {
            this.store.dispatch(new RemoveFilm(this.movie));
        }
    }
}
