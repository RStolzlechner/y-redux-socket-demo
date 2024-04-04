import { Component } from '@angular/core';
import { DemoItemFacade } from '../ng-rx-store/demo-item/demo-item.facade';
import { AsyncPipe } from '@angular/common';
import { DemoItemFormComponent } from './demo-item-form.component';
import { DemoItem } from '../models/demo-item';

/**
 * The component to edit the data of a demo item.
 * It provides a form to enter the data and buttons to save or cancel the editing.
 */
@Component({
  selector: 'app-demo-item-detail',
  standalone: true,
  template: `@if (selectedItem$ | async) {
    <app-demo-item-form
      [initialItem$]="selectedItem$"
      (saveItem)="saveItem($event)"
      (cancelSave)="cancelSave()"
    ></app-demo-item-form>
  }`,
  imports: [AsyncPipe, DemoItemFormComponent],
})
export class DemoItemDetailComponent {
  protected selectedItem$ = this.demoItemService.selectedItem$();

  /**
   * Constructor
   * @param demoItemService The service for the demo item
   */
  constructor(private readonly demoItemService: DemoItemFacade) {}

  /**
   * Save the edited demo item.
   * @param demoItem The edited demo item
   */
  protected async saveItem(demoItem: DemoItem) {
    await this.demoItemService.update(demoItem);
    this.demoItemService.select(0);
  }

  /**
   * Cancel the editing of the demo item.
   */
  cancelSave() {
    this.demoItemService.select(0);
  }
}
