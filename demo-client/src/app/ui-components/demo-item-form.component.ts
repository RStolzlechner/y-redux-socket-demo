import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DemoItem } from '../models/demo-item';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
    <button type="submit" class="save-button" [disabled]="!itemForm.valid">
      Speichern
    </button>
    <button type="reset" class="cancel-button">Abbrechen</button>
  </form>`,
  imports: [FormsModule, ReactiveFormsModule],
})
export class DemoItemFormComponent implements OnInit {
  @Input() initialItem: DemoItem = { id: 0, name: '', description: '' };

  @Output() saveItem: EventEmitter<DemoItem> = new EventEmitter<DemoItem>();
  @Output() cancelSave: EventEmitter<void> = new EventEmitter<void>();

  protected itemForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  ngOnInit(): void {
    this.itemForm.setValue({
      id: this.initialItem.id,
      name: this.initialItem.name,
      description: this.initialItem.description,
    });
  }

  protected onSubmit() {
    const demoItem: DemoItem = {
      id: this.itemForm.value.id ?? 0,
      name: this.itemForm.value.name ?? '',
      description: this.itemForm.value.description ?? '',
    };
    this.saveItem.emit(demoItem);
    this.itemForm.reset();
  }

  protected onReset() {
    this.cancelSave.emit();
  }
}
