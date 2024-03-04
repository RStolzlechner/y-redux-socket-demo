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
import { demoItemActions } from '../../ng-rx-store/demo-item/demo-item.actions';

@Injectable({ providedIn: 'root' })
export class DemoItemHub {
  private connection!: HubConnection;

  constructor(
    private urlService: UrlService,
    private readonly store: Store<RootState>,
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

    await this.connection.start();

    this.connection.on('DemoItemCreated', (item: DemoItem) => {
      this.store.dispatch(demoItemActions.createSuccess(item));
    });
  }

  public async loadDemoItems() {
    return await this.connection.invoke<DemoItem[]>('LoadDemoItems');
  }
}
