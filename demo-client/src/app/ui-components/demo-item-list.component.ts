import { Component, OnInit } from '@angular/core';
import { DemoItemFacade } from '../ng-rx-store/demo-item/demo-item.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-demo-item-list',
  standalone: true,
  template: ` @if (items$ | async; as items) {
    @if (selectedId$ | async; as selectedId) {
      <table class="table-auto w-full">
        <caption>
          All Einträge im Redux-Store
        </caption>
        <tr class="bg-gray-200">
          <th>ID</th>
          <th>Name</th>
          <th>Beschreibung</th>
          <th>Aktionen</th>
        </tr>
        @for (item of items; track item.id) {
          <tr class="cursor-pointer" (click)="selectItem(item.id)">
            <td>
              <input
                type="radio"
                name="selection"
                [checked]="item.id === selectedId.id"
              />
              {{ item.id }}
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>
              <div
                class="cursor-pointer tooltip"
                (click)="deleteItem($event, item.id)"
              >
                &#10006;
                <div class="tooltiptext">Löschen</div>
              </div>
            </td>
          </tr>
        }
      </table>
    }
  }`,
  imports: [AsyncPipe],
})
export class DemoItemListComponent implements OnInit {
  items$ = this.demoItemService.items$();
  selectedId$ = this.demoItemService.selectedId$();

  constructor(private readonly demoItemService: DemoItemFacade) {}

  async ngOnInit() {}

  protected selectItem(id: number) {
    this.demoItemService.select(id);
  }

  protected deleteItem($event: MouseEvent, id: number) {
    $event.stopPropagation();
    this.demoItemService.remove(id);
  }
}
