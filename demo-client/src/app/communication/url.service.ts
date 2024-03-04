import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UrlService {
  private httpUrl = 'http://localhost:5151/api';
  private hubUrl = 'http://localhost:5151/demo-item-hub';

  getServerHttpUrl(method: string) {
    if (!method) return this.httpUrl;

    return `${this.httpUrl}/${method}`;
  }

  getHubUrl() {
    return this.hubUrl;
  }
}
