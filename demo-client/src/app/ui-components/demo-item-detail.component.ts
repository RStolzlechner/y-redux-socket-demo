import { Component, OnInit } from '@angular/core';
import { DemoItemFacade } from '../ng-rx-store/demo-item/demo-item.facade';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-demo-item-detail',
  standalone: true,
  template: `<div>Hi from Demo Item Detail</div>`,
  imports: [],
})
export class DemoItemDetailComponent implements OnInit {
  constructor(private readonly demoItemService: DemoItemFacade) {}

  async ngOnInit() {}
}
