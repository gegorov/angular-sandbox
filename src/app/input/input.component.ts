import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  /** Emit search query string on user submit  */
  @Output() public notify: EventEmitter<string> = new EventEmitter();

  /**
   * Eventhandler to catch value from the input and emit it further to parent
   * @param {string} value - emitted value
   */
  public onInputChange(value: string): void {
    this.notify.emit(value);
  }
}
