import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestHub } from './communication/signal-r/test.hub';
import { CommonModule } from '@angular/common';
import { DemoItemDetailComponent } from './ui-components/demo-item-detail.component';
import { DemoItemListComponent } from './ui-components/demo-item-list.component';
import { DemoItemOverviewComponent } from './ui-components/demo-item-overview.component';
import { DemoItemFacade } from './ng-rx-store/demo-item/demo-item.facade';
import { DemoItemAddComponent } from './ui-components/demo-item-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    DemoItemDetailComponent,
    DemoItemListComponent,
    DemoItemOverviewComponent,
    DemoItemAddComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private testHub: TestHub,
    private readonly demoItemService: DemoItemFacade,
  ) {}

  async ngOnInit() {
    await this.testHub.createHub();
    await this.demoItemService.load();
  }
}
