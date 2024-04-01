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
import { LoadDemoItemResponse } from '../../models/load-demo-item-response';
import { DemoItemApi } from '../api/demo-item.api';
import { firstValueFrom } from 'rxjs';
import { DemoItemFacade } from '../../ng-rx-store/demo-item/demo-item.facade';

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
   * @param apiService
   */
  constructor(
    private urlService: UrlService,
    private readonly store: Store<RootState>,
    private readonly apiService: DemoItemApi,
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
    this.connection.on('OnNewAction', async () => {
      const successActions = await firstValueFrom(
        this.apiService.actionsSince(this.version),
      );
      for (let a of successActions) {
        this.store.dispatch(a);
      }
    });
  }

  /**
   * Load the demo items from the server.
   */
  public async loadDemoItems() {
    const response =
      await this.connection.invoke<LoadDemoItemResponse>('LoadDemoItems');
    this.version = response.version;
    return response;
  }

  private notDispatched: TypedAction<any>[] = [];
  private version: number = 0;

  public sendNotDispatchedToServer = async (action: TypedAction<any>) => {
    this.notDispatched.push(action);

    let successfullyDispatched: TypedAction<any>[] = [];

    for (const action of this.notDispatched) {
      try {
        const result = await firstValueFrom(
          this.apiService.dispatchAction(action, this.version),
        );
        if (result.executed) {
          this.version++;
          successfullyDispatched.push(action);
        }
      } catch (error) {
        console.error('Failed to dispatch action:', error);
      }
    }

    this.notDispatched = this.notDispatched.filter(
      (a) => !successfullyDispatched.includes(a),
    );
  };
}
