import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /** used as a storage for value riecived from child input */
  public value: string = '';

  /**
   * Listener for data emited from child input to set emitted value to lacal variable
   * @param {string} value - data from input
   */
  public onNotify(value: string): void {
    this.value = value;
  }
}
