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

/**
 * The component to add a new demo item.
 * It provides a button to add a new item and a form to enter the data.
 * The form is only shown if the button is clicked.
 */
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
  /**
   * The flag to show the form or the button.
   */
  protected onNew = false;

  /**
   * Constructor
   * @param demoItemService The service for the demo item
   */
  constructor(private demoItemService: DemoItemFacade) {}

  /**
   * Set the flag to show the form or the button.
   * @param onNew The flag to show the form or the button
   */
  protected setOnNew(onNew: boolean) {
    this.onNew = onNew;
  }

  /**
   * Submit the form and create a new demo item.
   * @param demoItem The demo item to create
   */
  protected onSubmit(demoItem: DemoItem) {
    this.demoItemService.create(demoItem);

    this.onNew = false;
  }
}
