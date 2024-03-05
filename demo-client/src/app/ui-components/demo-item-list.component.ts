import { Component, OnInit } from '@angular/core';
import { DemoItemFacade } from '../ng-rx-store/demo-item/demo-item.facade';
import { AsyncPipe } from '@angular/common';

/**
 * The component to show a list of demo items.
 * It provides a table with all items in the Redux store.
 * It shows the ID, the name and the description of the items.
 * It also provides a button to delete an item.
 */
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
export class DemoItemListComponent {
  /**
   * The items in the Redux store.
   */
  protected items$ = this.demoItemService.items$();
  /**
   * The selected item in the Redux store.
   */
  protected selectedId$ = this.demoItemService.selectedId$();

  /**
   * Constructor
   * @param demoItemService The service for the demo item
   */
  constructor(private readonly demoItemService: DemoItemFacade) {}

  /**
   * Select an item in the Redux store.
   * @param id The ID of the item to select
   */
  protected selectItem(id: number) {
    this.demoItemService.select(id);
  }

  /**
   * Delete an item from the Redux store.
   * @param $event The event that triggered the delete
   * @param id The ID of the item to delete
   */
  protected deleteItem($event: MouseEvent, id: number) {
    $event.stopPropagation();
    this.demoItemService.remove(id);
  }
}
