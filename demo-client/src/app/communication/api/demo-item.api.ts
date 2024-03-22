import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';
import { DemoItem } from '../../models/demo-item';

/**
 * The api to communicate with the server for the demo item feature.
 */
@Injectable({ providedIn: 'root' })
export class DemoItemApi {
  /**
   * Constructor to inject the dependencies.
   * @param urlService The url service to get the server urls.
   * @param httpClient The Angular HttpClient to communicate with the server using http protocol.
   */
  constructor(
    private readonly urlService: UrlService,
    private readonly httpClient: HttpClient,
  ) {}

  /**
   * create a demo items
   * @param demoItem The demo item to create
   * @returns The observable to subscribe to
   */
  public createDemoItem(demoItem: DemoItem) {
    return this.httpClient.post<void>(
      this.urlService.getServerHttpUrl('demo-item'),
      demoItem,
    );
  }

  /**
   * Update a demo item
   * @param demoItem The demo item to update
   * @returns The observable to subscribe to
   */
  public updateDemoItem(demoItem: DemoItem) {
    return this.httpClient.put<DemoItem>(
      this.urlService.getServerHttpUrl('demo-item'),
      demoItem,
    );
  }

  /**
   * Delete a demo item
   * @param id The id of the demo item to delete
   */
  public deleteDemoItem(id: number) {
    return this.httpClient.delete<void>(
      this.urlService.getServerHttpUrl(`demo-item/${id}`),
    );
  }

  /**
   * Duplicate a demo item
   * @param id The id of the demo item to duplicate
   */
  public duplicateDemoItem(id: number) {
    return this.httpClient.post<void>(
      this.urlService.getServerHttpUrl(`demo-item/duplicate`),
      { id },
    );
  }
}
