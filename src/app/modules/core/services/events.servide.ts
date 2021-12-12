import { EventEmitter, Injectable } from '@angular/core';
import { v1 as uuidv1 } from 'uuid';

export enum EventsTypes {
  UPDATE_HEROES = 'UPDATE_HEROES'
}

export default interface EventType {
  id: string;
  date: Date;
  type: string;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  public events$: EventEmitter<EventType>;

  constructor() {
    this.events$ = new EventEmitter();
  }

  public send(opts: {data?: any, type: string}): void {
    const event: EventType = {
      date: new Date(),
      id: uuidv1(),
      data: opts.data,
      type: opts.type,
    };

    this.events$.emit(event);
  }
}
