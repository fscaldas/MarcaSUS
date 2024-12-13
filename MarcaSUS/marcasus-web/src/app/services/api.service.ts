import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import config from '../config';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(config.baseUrl + endpoint, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
  }

  public post<T>(endpoint: string, data: T) {
    return this.http.post(config.baseUrl + endpoint, data, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
  }

  public delete<T>(endpoint: string) {
    return this.http.delete(config.baseUrl + endpoint, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
  }
}
