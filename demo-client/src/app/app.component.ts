import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestHub } from './communication/signal-r/test.hub';
import { CommonModule } from '@angular/common';
import { DemoItemDetailComponent } from './ui-components/demo-item-detail.component';
import { DemoItemListComponent } from './ui-components/demo-item-list.component';
import { DemoItemOverviewComponent } from './ui-components/demo-item-overview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    DemoItemDetailComponent,
    DemoItemListComponent,
    DemoItemOverviewComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private selection = 1;
  protected testSelected = () => this.selection === 0;
  protected yReduxSelected = () => this.selection === 1;
  protected traditionalSelected = () => this.selection === 2;

  title = 'client';

  constructor(private testHub: TestHub) {}

  async ngOnInit() {
    await this.testHub.createHub();
  }

  protected selectTest = () => (this.selection = 0);
  protected selectYRedux = () => (this.selection = 1);
  protected selectTraditional = () => (this.selection = 2);
}
