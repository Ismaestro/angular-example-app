import { EventEmitter, Injectable } from '@angular/core';

export enum EventBusType {
  TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
  CLOSE_SIDEBAR = 'CLOSE_SIDEBAR',
  FINISH_LOGOUT = 'FINISH_LOGOUT',
}

export enum EventBCType {
  SESSION_CHANGED = 'SESSION_CHANGED',
}

export default interface EventBusEvent {
  id: string;
  date: Date;
  type: string;
  data?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  public eventsBC: BroadcastChannel;
  public events$: EventEmitter<EventBusEvent>;

  constructor() {
    this.eventsBC = new BroadcastChannel('events-broadcast-channel');
    this.events$ = new EventEmitter();
  }

  public emit(opts: { data?: unknown; type: EventBusType }): void {
    const event: EventBusEvent = {
      date: new Date(),
      id: (Date.now() + Math.random()).toString(),
      data: opts.data,
      type: opts.type,
    };

    this.events$.emit(event);
  }
}
