import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { OperatorFunction, throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ObservableInput, ObservedValueOf } from 'rxjs/internal/types';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  catchErrorAndShowToast<T, O extends ObservableInput<any>>(): OperatorFunction<T, T | ObservedValueOf<O>> {
    return catchError(err => {
      this.showErrorToast();

      return throwError(err);
    });
  }

  showErrorToast() {
    const toast = this.toastController.create({
      message: 'Coś poszło nie tak...',
      duration: 700
    });
    toast.then(e => {
      e.present().then();
    });
  }
}
