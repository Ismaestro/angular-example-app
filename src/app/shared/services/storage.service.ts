import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';

export enum StorageKey {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  LANGUAGE = 'language',
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getCookie(name: StorageKey): string | undefined {
    return Cookies.get(name);
  }

  setCookie(name: StorageKey, value: string, expires?: number): string | undefined {
    return Cookies.set(name, value, { expires: expires || 365 });
  }

  removeCookie(name: StorageKey): void {
    return Cookies.remove(name);
  }
}
