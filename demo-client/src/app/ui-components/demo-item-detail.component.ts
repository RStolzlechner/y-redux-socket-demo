import { Component, OnInit, signal } from '@angular/core';
import { DemoItemFacade } from '../ng-rx-store/demo-item/demo-item.facade';
import { AsyncPipe } from '@angular/common';
import { DemoItemFormComponent } from './demo-item-form.component';
import { DemoItem } from '../models/demo-item';

@Component({
  selector: 'app-demo-item-detail',
  standalone: true,
  template: `@if (selectedItem$ | async; as selectedItem) {
      <app-demo-item-form
        [initialItem]="selectedItem"
        (saveItem)="saveItem($event)"
        (cancelSave)="cancelSave()"
      ></app-demo-item-form>
    } @else {
      <div>Keine Auswahl getroffen.</div>
    }`,
  imports: [AsyncPipe, DemoItemFormComponent],
})
export class DemoItemDetailComponent implements OnInit {
  protected selectedItem$ = this.demoItemService.selectedItem$();

  constructor(private readonly demoItemService: DemoItemFacade) {}

  async ngOnInit() {}

  saveItem(demoItem: DemoItem) {
    this.demoItemService.update(demoItem);
    this.demoItemService.select(0);
  }

  cancelSave() {
    this.demoItemService.select(0);
  }
}
