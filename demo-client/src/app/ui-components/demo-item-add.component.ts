import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DemoItemFacade } from '../ng-rx-store/demo-item/demo-item.facade';
import { DemoItem } from '../models/demo-item';
import { DemoItemFormComponent } from './demo-item-form.component';

@Component({
  selector: 'app-demo-item-add',
  standalone: true,
  template: ` @if (!onNew) {
      <button (click)="setOnNew(true)" class="add-button">Neuer Eintrag</button>
    } @else {
      <app-demo-item-form
        (saveItem)="onSubmit($event)"
        (cancelSave)="setOnNew(false)"
      ></app-demo-item-form>
    }`,
  imports: [ReactiveFormsModule, DemoItemFormComponent],
})
export class DemoItemAddComponent {
  protected onNew = false;

  constructor(private demoItemService: DemoItemFacade) {}

  protected setOnNew(onNew: boolean) {
    this.onNew = onNew;
  }
  protected onSubmit(demoItem: DemoItem) {
    this.demoItemService.create(demoItem);

    this.onNew = false;
  }
}
