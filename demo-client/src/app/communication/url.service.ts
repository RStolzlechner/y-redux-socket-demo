import { Injectable } from '@angular/core';

/**
 * Service to provide the server urls.
 */
@Injectable({ providedIn: 'root' })
export class UrlService {
  private httpUrl = 'http://localhost:5151/api';
  private hubUrl = 'http://localhost:5151/demo-item-hub';

  /**
   * Get the server http url.
   * @param method The method route to call on the server
   */
  getServerHttpUrl(method: string) {
    if (!method) return this.httpUrl;

    return `${this.httpUrl}/${method}`;
  }

  /**
   * Get the server hub url.
   */
  getHubUrl() {
    return this.hubUrl;
  }
}
