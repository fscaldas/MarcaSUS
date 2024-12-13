import { Injectable } from '@angular/core';
import { isNil } from 'lodash';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  public exists(key: string): Observable<boolean> {
    return of(!isNil(this.storage.getItem(key)));
  }

  public get<T>(key: string): Observable<T> {
    return of(JSON.parse(this.storage.getItem(key) as string) as T);
  }

  public remove(key: string): Observable<void> {
    return of(this.storage.removeItem(key));
  }

  public set<T>(key: string, value: T): Observable<T> {
    return of(this.storage.setItem(key, JSON.stringify(value))).pipe(
      map(() => value)
    );
  }
}
