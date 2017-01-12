import {Injectable} from '@angular/core';

@Injectable()
export class LoggerService {
  log(msg: string) {
    console.log(msg);
  }

  error(msg: string, obj?: any) {
    console.error(msg, obj);
  }
}
