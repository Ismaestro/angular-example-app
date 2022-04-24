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

  static get(name: string): string | null {
    try {
      return JSON.parse(localStorage.getItem(name) as string);
    } catch (error) {
      return null;
    }
  }

  static set(name: string, value: any): void {
    localStorage.setItem(name, value);
  }

  static remove(name: string): void {
    localStorage.removeItem(name);
  }

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
