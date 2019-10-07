import { Component } from '@angular/core';
import { MovieApiService } from '../core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  public api: MovieApiService;

  color: string = 'primary';
  mode: string = 'indeterminate';
  value: number = 50;

  constructor(moiveApiService: MovieApiService) {
    this.api = moiveApiService;
  }
}
