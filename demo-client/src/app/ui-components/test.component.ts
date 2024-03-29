import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { testActions } from '../ng-rx-store/test/test.actions';
import { testSelectors } from '../ng-rx-store/test/test.selectors';
import { TestState } from '../ng-rx-store/test/test.state';
import { RootState } from '../ng-rx-store/state';
import { of } from 'rxjs';

@Component({
  selector: 'app-test',
  imports: [CommonModule],
  template: `
    <div>
      Test component to test the tec stack. Can be removed when finished
    </div>
    <div>
      <h3>HTTP Request - Response</h3>
      <button (click)="httpRequestResponseClicked()">click me</button>
      <div>Resp: {{ httpRequestResponse$ | async }}</div>

      <h3>HTTP Request - SignalR Response</h3>
      <button (click)="httpRequestSignalRResponseClicked()">click me</button>
      <div>Resp: {{ httpRequestSignalRResponse$ | async }}</div>

      <h3>SignalR Request - Response</h3>
      <button (click)="SignalRRequestResponseClicked()">click me</button>
      <div>Resp: {{ signalRRequestResponse$ | async }}</div>
    </div>
  `,
  standalone: true,
})
export class TestComponent {
  protected httpRequestResponse$ = this.store.select(
    testSelectors.selectHttpRequestResponse,
  );
  protected httpRequestSignalRResponse$ = this.store.select(
    testSelectors.selectHttpRequestSignalRResponse,
  );
  protected signalRRequestResponse$ = this.store.select(
    testSelectors.selectSignalRRequestResponse,
  );

  constructor(private store: Store<RootState>) {}

  protected httpRequestResponseClicked() {
    this.store.dispatch(testActions.httpRequestResponse());
  }

  protected httpRequestSignalRResponseClicked() {
    this.store.dispatch(testActions.httpRequestSignalRResponse());
  }

  protected SignalRRequestResponseClicked() {
    this.store.dispatch(testActions.signalRRequestResponse());
  }
}
