import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable } from 'rxjs';

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
   * @param version the version of the action
   */
  public dispatchAction(action: TypedAction<any>, version: number) {
    const url = this.urlService.getServerHttpUrl(
      `demo-item/dispatch/${version}`,
    );
    return this.httpClient.put<{ executed: boolean }>(url, action);
  }

  public actionsSince(version: number): Observable<TypedAction<any>[]> {
    const url = this.urlService.getServerHttpUrl(
      `demo-item/actions-since/${version}`,
    );
    return this.httpClient.get<TypedAction<any>[]>(url);
  }
}
