import { Component, OnInit } from '@angular/core';
import { DemoItemFacade } from '../ng-rx-store/demo-item/demo-item.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-demo-item-detail',
  standalone: true,
  template: `@if (selectedItem$ | async; as selectedItem) {
      <div>Gewählt:</div>
      <div>{{ selectedItem.id }}</div>
      <div>{{ selectedItem.name }}</div>
      <div>{{ selectedItem.description }}</div>
    } @else {
      <div>Keine Auswahl getroffen.</div>
    }`,
  imports: [AsyncPipe],
})
export class DemoItemDetailComponent implements OnInit {
  protected selectedItem$ = this.demoItemService.selectedItem();

  constructor(private readonly demoItemService: DemoItemFacade) {}

  async ngOnInit() {}
}
