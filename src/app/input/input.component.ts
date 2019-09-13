import { Component, Output, EventEmitter } from '@angular/core';
import { Utils } from '../core/utils/index';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  /** Emit search query string on user submit  */
  @Output() public notify: EventEmitter<string> = new EventEmitter();
  public disabled: boolean = true;

  /**
   * EventHandler to catch value from the input and emit it further to parent
   * @param {string} value - emitted value
   */
  public onInputChange(value: string): void {
    this.notify.emit(value);
  }

  public luckySearch(): void {
    this.notify.emit(Utils.randomChar());
  }
  public changeDisabled($event: KeyboardEvent): void {
    if (($event.target as HTMLInputElement).value === '') {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }
}
