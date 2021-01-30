import { Injectable } from '@angular/core';
import { ObservableInput, ObservedValueOf } from 'rxjs/internal/types';
import { OperatorFunction } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RefresherService {

  constructor() { }

  finishRefresher<T, O extends ObservableInput<any>>($event: any): OperatorFunction<T, T | ObservedValueOf<O>> {
    return finalize(() => {
      $event.target.complete();
    });
  }
}
