import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';
import { DemoItem } from '../../models/demo-item';

@Injectable({ providedIn: 'root' })
export class DemoItemApi {
  constructor(
    private readonly urlService: UrlService,
    private readonly httpClient: HttpClient,
  ) {}

  public createDemoItem(demoItem: DemoItem) {
    return this.httpClient.post<DemoItem>(
      this.urlService.getServerHttpUrl('demo-item'),
      demoItem,
    );
  }
}
