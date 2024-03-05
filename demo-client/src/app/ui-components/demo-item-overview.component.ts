import { Component, OnInit } from '@angular/core';
import { DemoItemFacade } from '../ng-rx-store/demo-item/demo-item.facade';
import { AsyncPipe } from '@angular/common';

/**
 * The component to show an overview of the demo items.
 * It provides the number of items in the Redux store.
 */
@Component({
  selector: 'app-demo-item-overview',
  standalone: true,
  template: ` @if (count$ | async; as x) {
    <div>
      Im Redux-Store sind <b>{{ x.count }}</b> Einträge vorhanden.
    </div>
  }`,
  imports: [AsyncPipe],
})
export class DemoItemOverviewComponent {
  /**
   * The number of items in the Redux store.
   */
  protected count$ = this.demoItemService.count$();

  /**
   * Constructor
   * @param demoItemService The service for the demo item
   */
  constructor(private readonly demoItemService: DemoItemFacade) {}
}
