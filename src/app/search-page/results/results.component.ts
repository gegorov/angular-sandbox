import { Component, Input } from '@angular/core';
import { MovieWithCast } from '../../core/models';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  /**
   * This is used to receive value from parent component and render in template
   */
  @Input() public searchResult$!: Array<MovieWithCast>;
}
