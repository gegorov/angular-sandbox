import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'angular-sandbox';
  public value: string = '';
  public onNotify(value: string): void {
    this.value = value;
  }
}
