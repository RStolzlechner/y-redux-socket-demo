import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DemoItemFacade } from '../ng-rx-store/demo-item/demo-item.facade';
import { DemoItem } from '../models/demo-item';

@Component({
  selector: 'app-demo-item-add',
  standalone: true,
  template: ` @if (!onNew) {
      <button (click)="setOnNew(true)" class="add-button">Neuer Eintrag</button>
    } @else {
      <form
        class="item-form"
        [formGroup]="itemForm"
        (submit)="onSubmit()"
        (reset)="setOnNew(false)"
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
              <input
                id="description"
                type="text"
                formControlName="description"
              />
            </div>
          </div>
        </div>
        <button type="submit" class="save-button" [disabled]="!itemForm.valid">
          Speichern
        </button>
        <button type="reset" class="cancel-button">Abbrechen</button>
      </form>
    }`,
  imports: [ReactiveFormsModule],
})
export class DemoItemAddComponent {
  protected onNew = false;

  protected itemForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(private demoItemService: DemoItemFacade) {}

  protected setOnNew(onNew: boolean) {
    this.onNew = onNew;
  }
  protected onSubmit() {
    const demoItem: DemoItem = {
      id: 0,
      name: this.itemForm.value.name ?? '',
      description: this.itemForm.value.description ?? '',
    };
    this.demoItemService.create(demoItem);

    this.onNew = false;
    this.itemForm.reset();
  }
}
