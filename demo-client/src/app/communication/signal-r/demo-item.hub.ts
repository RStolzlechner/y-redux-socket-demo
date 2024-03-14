import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { UrlService } from '../url.service';
import { DemoItem } from '../../models/demo-item';
import { Store } from '@ngrx/store';
import { RootState } from '../../ng-rx-store/state';
import { TypedAction } from '@ngrx/store/src/models';

/**
 * The hub to communicate with the server for the demo item feature.
 */
@Injectable({ providedIn: 'root' })
export class DemoItemHub {
  private connection!: HubConnection;

  /**
   * Constructor to inject the dependencies.
   * @param urlService The url service to get the server urls.
   * @param store The Redux store to dispatch actions and select data from the store.
   */
  constructor(
    private urlService: UrlService,
    private readonly store: Store<RootState>,
  ) {}

  /**
   * Create the hub connection to the server.
   * The hub connection is used to communicate with the server using the websocket protocol.
   * The hub connection listens to server events and dispatches actions to the store.
   */
  public async createHub() {
    const url = this.urlService.getHubUrl();
    this.connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Error)
      .withUrl(url, {})
      .withAutomaticReconnect()
      .build();

    this.connection.serverTimeoutInMilliseconds = 120_000;
    this.connection.keepAliveIntervalInMilliseconds = 500;

    await this.connection.start();

    //listen on DispatchSuccess events and dispatch the received action
    this.connection.on('DispatchSuccess', (action: TypedAction<any>) => {
      this.store.dispatch(action);
    });
  }

  /**
   * Load the demo items from the server.
   */
  public async loadDemoItems() {
    return await this.connection.invoke<DemoItem[]>('LoadDemoItems');
  }
}
