import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { MovieWithCast, FilmsToWatchStoreFacade } from '../../core/index';
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

    private filmsToWatchStoreFacade: FilmsToWatchStoreFacade;
    constructor(filmsToWatchStoreFacade: FilmsToWatchStoreFacade) {
        this.filmsToWatchStoreFacade = filmsToWatchStoreFacade;
    }

    /**
     * Function that fires eiter add or remove film action
     * @param {MatCheckboxChange} event
     */
    public onChange(event: MatCheckboxChange): void {
        if (event.checked) {
            this.filmsToWatchStoreFacade.addFilmToList(this.movie);
        } else {
            this.filmsToWatchStoreFacade.removeFilmFromList(this.movie);
        }
    }
}
