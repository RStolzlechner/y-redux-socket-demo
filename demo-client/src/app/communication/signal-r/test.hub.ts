import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { RootState } from '../../ng-rx-store/state';
import { testActions } from '../../ng-rx-store/test/test.actions';

@Injectable({ providedIn: 'root' })
export class TestHub {
  private connection!: HubConnection;

  constructor(
    private urlService: UrlService,
    private store: Store<RootState>,
  ) {}

  public async createHub() {
    const url = this.urlService.getHubUrl();
    this.connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Error)
      .withUrl(url, {})
      .withAutomaticReconnect()
      .build();

    this.connection.serverTimeoutInMilliseconds = 120_000;
    this.connection.keepAliveIntervalInMilliseconds = 500;

    this.connection.on('TestCallClient', (message: string) => {
      this.store.dispatch(
        testActions.httpRequestSignalRResponseSuccess({
          serverResponse: message,
        }),
      );
    });

    await this.connection.start();
  }

  public async testCallServer() {
    const response = await this.connection.invoke<string>(
      'TestCallServer',
      'this message is from client',
    );
    this.store.dispatch(
      testActions.signalRRequestResponseSuccess({ serverResponse: response }),
    );
  }
}
