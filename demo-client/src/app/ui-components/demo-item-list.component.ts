import { Component, OnInit } from '@angular/core';
import { DemoItemFacade } from '../ng-rx-store/demo-item/demo-item.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-demo-item-list',
  standalone: true,
  template: ` @if (items$ | async; as items) {
    <table class="table-auto w-full">
      <caption>
        All Einträge im Redux-Store
      </caption>
      <tr class="bg-gray-200">
        <th>ID</th>
        <th>Name</th>
        <th>Beschreibung</th>
      </tr>
      @for (item of items; track item.id) {
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
        </tr>
      }
    </table>
  }`,
  imports: [AsyncPipe],
})
export class DemoItemListComponent implements OnInit {
  items$ = this.demoItemService.items$();

  constructor(private readonly demoItemService: DemoItemFacade) {}

  async ngOnInit() {}
}
