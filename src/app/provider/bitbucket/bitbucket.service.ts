import {Injectable, NgZone} from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import {BitbucketWizardComponent} from './bitbucket-wizard/bitbucket-wizard.component';
import {BitbucketClient} from "./bitbucket-client";
@Injectable({
  providedIn: 'root'
})
export class BitbucketService {

  constructor(private window: Window,
              private ngZone: NgZone,
              private modalController: ModalController
              ) {

  }

  integrateNewRepository(): Observable<BitbucketClient> {
    return new Observable(subscriber => {
      this.modalController.create({
        component: BitbucketWizardComponent
      }).then(modal => {
          modal.present()
              .then(m => {
                  return m;
              })
              .catch(err => {
                  subscriber.error(err);
              });
          modal.onDidDismiss()
              .then(m => {
                  const { data } = m;
                  subscriber.next(data as BitbucketClient);
                  subscriber.complete();
                  return m;
              })
              .catch(err => {
                  subscriber.error(err);
              });
      })
      .catch(err => {
        subscriber.error(err);
      });
    });
  }
}
