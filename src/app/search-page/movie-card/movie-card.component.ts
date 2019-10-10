import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MovieWithCast } from '../../core/index';

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
}
