import { inject } from '@angular/core';
import {
  CanActivateChildFn,
  CanActivateFn,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { StorageService } from '../services/storage.service';
export const isLoggedIn: CanActivateChildFn = (route, state) => {
  const storage = inject(StorageService);
  console.log('existes');

  return storage.exists('cpf').pipe(
    map((exists) => {
      return !exists ? createUrlTreeFromSnapshot(route, ['/login']) : true;
    })
  );
};

export const isntLoggedIn: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);

  return storage.exists('cpf').pipe(
    map((exists) => {
      console.log('existes2', exists);

      return exists ? createUrlTreeFromSnapshot(route, ['/home']) : true;
    })
  );
};
