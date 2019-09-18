import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Utils } from '../core/utils/index';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  /** Emit search query string on user submit  */
  @Output() public notify: EventEmitter<string> = new EventEmitter();
  public disabled: boolean = true;
  public form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      searchInput: new FormControl('', [Validators.required])
    });
  }

  /**
   * EventHandler to catch value from the input and emit it further to parent
   * @param {string} value - emitted value
   */
  public onClick(value: string, $event: MouseEvent | KeyboardEvent): void {
    console.log('EVENT: ', $event);
    $event.preventDefault();
    this.notify.emit(value);
  }

  public luckySearch($event: MouseEvent): void {
    console.log('EVENT2: ', $event);
    $event.preventDefault();
    this.notify.emit(Utils.randomChar());
  }

  public submit(): void {
    if (this.form.valid) {
      // const formData = { ...this.form.value };
      console.log('form: ', this.form);
      const searchInput: AbstractControl = this.form.get('searchInput') as AbstractControl;

      this.notify.emit(searchInput.value);

      this.form.reset();
      // this.form.markAsPristine();
      this.form.updateValueAndValidity();
    }
  }
}
