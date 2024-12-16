import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionManagerService {
  private readonly destroy$ = new WeakMap<object, Subject<void>>();

  getDestroySubject(component: object): Subject<void> {
    if (!this.destroy$.has(component)) {
      this.destroy$.set(component, new Subject<void>());
    }
    return this.destroy$.get(component)!;
  }

  unsubscribe(component: object): void {
    const destroySubject = this.destroy$.get(component);
    if (destroySubject) {
      destroySubject.next();
      destroySubject.complete();
      this.destroy$.delete(component);
    }
  }
}
