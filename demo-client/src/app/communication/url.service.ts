import { Inject } from "@angular/core";

@Inject({ providedIn: "root" })
export class UrlService {
  private httpUrl = "http://localhost:5151/api/";

  getServerHttpUrl(method: string) {
    if (!method) return this.httpUrl;

    return `${this.httpUrl}/${method}`;
  }
}
