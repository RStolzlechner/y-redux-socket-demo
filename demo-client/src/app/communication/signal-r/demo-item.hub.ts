import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { UrlService } from '../url.service';
import { DemoItem } from '../../models/demo-item';

@Injectable({ providedIn: 'root' })
export class DemoItemHub {
  private connection!: HubConnection;

  constructor(private urlService: UrlService) {}

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
  }

  public async loadDemoItems() {
    return await this.connection.invoke<DemoItem[]>('LoadDemoItems');
  }
}
