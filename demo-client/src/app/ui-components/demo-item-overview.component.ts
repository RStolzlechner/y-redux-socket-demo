import { Component, OnInit } from '@angular/core';
import { DemoItemFacade } from '../ng-rx-store/demo-item/demo-item.facade';
import { AsyncPipe } from '@angular/common';

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
export class DemoItemOverviewComponent implements OnInit {
  protected count$ = this.demoItemService.count$();

  constructor(private readonly demoItemService: DemoItemFacade) {}

  async ngOnInit() {}
}
