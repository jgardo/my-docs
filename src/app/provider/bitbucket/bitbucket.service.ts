import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { BitbucketWizardComponent } from './bitbucket-wizard/bitbucket-wizard.component';
import { BitbucketClient } from './bitbucket-client';
import { Storage } from '@ionic/storage';
import { BitbucketConfig } from './model/bitbucket-config';
import { BitbucketClientProviderService } from './bitbucket-client-provider.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BitbucketService {
    private static PROVIDERS_KEY = 'providers.bitbucket';

    constructor(private window: Window,
                private ngZone: NgZone,
                private modalController: ModalController,
                private storage: Storage,
                private bitbucketClientProviderService: BitbucketClientProviderService
    ) {

    }

    list(): Observable<BitbucketConfig[]> {
        return new Observable<BitbucketConfig[]>(subscriber => {
            this.storage.get(BitbucketService.PROVIDERS_KEY)
                .then(value => {
                    const providers = value as Array<BitbucketConfig> || [] as Array<BitbucketConfig>;
                    subscriber.next(providers);
                    subscriber.complete();
                })
                .catch(e => subscriber.error(e));
        });
    }

    createBitbucketClient(config: BitbucketConfig): Observable<BitbucketClient> {
        const clientId = environment.bitbucketClientId;

        return this.bitbucketClientProviderService.retrieveRawClient(clientId)
            .pipe(map(bitbucket => new BitbucketClient(bitbucket.bitbucket, config, bitbucket.expiresIn)));
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
                        const {data: {bitbucket, config}} = m;
                        this.storage.get(BitbucketService.PROVIDERS_KEY)
                            .then(p => {
                                const providers = p as Array<BitbucketConfig> || [] as Array<BitbucketConfig>;

                                const existing = providers.findIndex((v) => v.repository.uuid === config.repository.uuid);
                                if (existing >= 0) {
                                    providers.splice(existing, 1);
                                }
                                providers.push(config);

                                this.storage.set(BitbucketService.PROVIDERS_KEY, providers)
                                    .then(r => {
                                        const bitbucketClient = new BitbucketClient(bitbucket, config);

                                        subscriber.next(bitbucketClient);
                                        subscriber.complete();
                                    });
                            });
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

    delete(repoUuid: string): Observable<void> {
        return new Observable(subscriber => {
            this.storage.get(BitbucketService.PROVIDERS_KEY)
                .then(p => {
                    const providers = p as Array<BitbucketConfig> || [] as Array<BitbucketConfig>;

                    const existing = providers.findIndex((v) => v.repository.uuid === repoUuid);
                    if (existing >= 0) {
                        providers.splice(existing, 1);
                    }

                    this.storage.set(BitbucketService.PROVIDERS_KEY, providers)
                        .then(() => {
                            subscriber.next();
                            subscriber.complete();
                        });
                });
        });
    }
}
