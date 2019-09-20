import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { generateRandomChar } from '../core/utils/index';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  /**
   * Emit search query string on user submit
   */
  @Output() public notify: EventEmitter<string> = new EventEmitter();

  /**
   * Variable to store form
   */
  public form: FormGroup;

  /**
   * method to initialize reactive form
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      searchInput: new FormControl('', [Validators.required])
    });
  }

  /**
   * Function that makes random search
   */
  public luckySearch(): void {
    this.makeSearch(generateRandomChar());
  }

  /**
   * OnSubmit handler for form
   */
  public onSubmit(): void {
    if (this.form.valid) {
      const searchInput: AbstractControl = this.form.get('searchInput') as AbstractControl;

      this.makeSearch(searchInput.value);
    }
  }

  /**
   * Function that emits search value and resets the form
   * @param value search string
   */
  private makeSearch(value: string): void {
    this.notify.emit(value);

    this.form.reset();
  }
}
