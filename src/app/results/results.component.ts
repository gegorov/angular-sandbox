import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  constructor() {}

  /** This is used to recive value from parent component and render in template */
  @Input() public searchResult!: string;
}
