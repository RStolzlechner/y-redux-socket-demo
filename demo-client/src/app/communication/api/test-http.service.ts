import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';

@Injectable({ providedIn: 'root' })
export class TestHttpService {
  constructor(
    private httpClient: HttpClient,
    private urlService: UrlService,
  ) {}

  ping() {
    const url = this.urlService.getServerHttpUrl('test');
    return this.httpClient.get<{ message: string }>(url);
  }
}
