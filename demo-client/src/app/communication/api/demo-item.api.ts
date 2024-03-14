import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';
import { TypedAction } from '@ngrx/store/src/models';

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
   * send an action to the server to command an execution
   * @param action typed action to send
   */
  public dispatchAction(action: TypedAction<any>) {
    const url = this.urlService.getServerHttpUrl('demo-item/dispatch');
    return this.httpClient.put(url, action);
  }
}
