import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ResponseMovie } from '../core/models';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent {
  @Input() movie: ResponseMovie;
  constructor() {}
}
