import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class TestHttpService {
  constructor(private httpClient: HttpClient) {}

  ping() {
    const url = "http://localhost:5151/api/Test";
    return this.httpClient.get<{ message: string }>(url);
  }
}
