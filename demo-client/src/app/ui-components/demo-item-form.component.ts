import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DemoItem } from '../models/demo-item';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * The component to edit the data of a demo item.
 * It provides a form to enter the data and buttons to save or cancel the editing.
 */
@Component({
  selector: 'app-demo-item-form',
  standalone: true,
  template: ` <form
    class="item-form"
    [formGroup]="itemForm"
    (submit)="onSubmit()"
    (reset)="onReset()"
  >
    <div class="grid">
      <div class="col-4 col-label">
        <div class="mb-2">
          <label for="name">Name</label>
        </div>
        <div>
          <label for="description">Beschreibung</label>
        </div>
      </div>
      <div class="col-8 col-input">
        <div class="mb-2">
          <input id="name" type="text" formControlName="name" />
        </div>
        <div>
          <input id="description" type="text" formControlName="description" />
        </div>
      </div>
    </div>
    <button type="submit" class="save-button" [disabled]="saveDisabled()">
      Speichern
    </button>
    <button type="reset" class="cancel-button">Abbrechen</button>
  </form>`,
  imports: [FormsModule, ReactiveFormsModule],
})
export class DemoItemFormComponent implements OnInit {
  /**
   * The initial item to edit.
   */
  @Input() initialItem: DemoItem = { id: 0, name: '', description: '' };

  /**
   * The event to save the item.
   */
  @Output() saveItem: EventEmitter<DemoItem> = new EventEmitter<DemoItem>();
  /**
   * The event to cancel the save.
   */
  @Output() cancelSave: EventEmitter<void> = new EventEmitter<void>();

  /**
   * The form to edit the item.
   */
  protected itemForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  /**
   * Initialize the component
   * set the initial values of the form
   */
  ngOnInit(): void {
    this.itemForm.setValue({
      id: this.initialItem.id,
      name: this.initialItem.name,
      description: this.initialItem.description,
    });
  }

  /**
   * Submit the form and save the item.
   */
  protected onSubmit() {
    const demoItem: DemoItem = {
      id: this.itemForm.value.id ?? 0,
      name: this.itemForm.value.name ?? '',
      description: this.itemForm.value.description ?? '',
    };
    this.saveItem.emit(demoItem);
    this.itemForm.reset();
  }

  /**
   * Reset the form and cancel the save.
   */
  protected onReset() {
    this.cancelSave.emit();
  }

  /**
   * Check if the save button should be disabled.
   * @returns True if the save button should be disabled
   */
  protected saveDisabled() {
    if (!this.itemForm.valid) return true;

    return (
      this.itemForm.value.name === this.initialItem.name &&
      this.itemForm.value.description === this.initialItem.description
    );
  }
}
