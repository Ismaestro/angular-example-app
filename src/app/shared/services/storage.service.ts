import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() {
  }

  getCookie(name: string): string | undefined  {
    return Cookies.get(name);
  }

  setCookie(name: string, value: string, expires?: number): string | undefined {
    return Cookies.set(name, value, { expires: expires || 365 });
  }

  removeCookie(name: string): void {
    return Cookies.remove(name);
  }
}
