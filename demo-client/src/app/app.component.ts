import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './ui-components/test.component';
import { TestHub } from './communication/signal-r/test.hub';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private testHub: TestHub) {}

  async ngOnInit() {
    await this.testHub.createHub();
  }
}
