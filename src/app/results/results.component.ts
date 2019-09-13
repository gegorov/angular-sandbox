import { Component, Input } from '@angular/core';
import { Movies } from '../core/models';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  constructor() {}

  /** This is used to recive value from parent component and render in template */
  @Input() public searchResult!: Movies[];
}
