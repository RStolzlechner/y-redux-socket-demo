import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map, withLatestFrom } from 'rxjs';
import { DemoItem } from '../models/demo-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-y-redux-socket-demo',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex" *ngIf="selectedId$ | async; let selectedId">
      <div>
        <button (click)="addItem()">Add</button>
        <div class="flex">
          <div>
            <ng-template ngFor let-item [ngForOf]="demoItems$ | async">
              <div
                class="flex hover:bg-black-alpha-10 m-1 cursor-pointer"
                (click)="selectItem(item.id)"
              >
                <input
                  type="radio"
                  class="mr-2"
                  name="demoItemSelection"
                  [value]="item.id"
                  [checked]="selectedId === item.id"
                />
                <div class="mr-2">{{ item.name }}</div>
                <div>{{ item.description }}</div>
              </div>
            </ng-template>
          </div>
          <div class="ml-5" *ngIf="selectedItem$ | async; let item">
            <div class="font-bold m-1">Details</div>
            <div class="flex m-1">
              <div>Name:</div>
              <div>{{ item.name }}</div>
            </div>
            <div class="flex m-1">
              <div>Description:</div>
              <div>{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
})
export class YReduxSocketDemoComponent {
  private demoItemsSubject = new BehaviorSubject<DemoItem[]>([
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
  ]);
  private selectedIdSubject = new BehaviorSubject<number>(-1);
  protected selectedId$ = this.selectedIdSubject.asObservable();

  protected demoItems$ = this.demoItemsSubject.asObservable();
  protected selectedItem$ = this.selectedId$.pipe(
    withLatestFrom(this.demoItems$),
    map(([id, items]) => items.find((item) => item.id === id)),
  );

  protected addItem = () => {
    const newId = this.demoItemsSubject.value.length + 1;
    this.demoItemsSubject.next([
      ...this.demoItemsSubject.value,
      {
        id: newId,
        name: `Item ${newId}`,
        description: `Description ${newId}`,
      },
    ]);
  };

  protected selectItem = (id: number) => {
    this.selectedIdSubject.next(id);
  };
}
