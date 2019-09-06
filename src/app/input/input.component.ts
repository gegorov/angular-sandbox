import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Output() notify: EventEmitter<string> = new EventEmitter();
  constructor() {}

  public onInputChange(value: string): void {
    this.notify.emit(value);
  }
}
