import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Output() notify = new EventEmitter();
  constructor() { }
  inputValue = '';

  onInputChange() {
    this.notify.emit(this.inputValue);
    return false;
  }
  ngOnInit() {
  }

}
