import { Injectable, NgZone } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';
import { BroadcastChannel } from 'broadcast-channel';
import { APIClient, Bitbucket, Schema } from 'bitbucket';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import Workspace = Schema.Workspace;
import Repository = Schema.Repository;

@Injectable({
    providedIn: 'root'
})
export class BitbucketClientProviderService {

    private bitbucketClientResultAsyncSubject: AsyncSubject<BitbucketClientResult>;
    private locked = false;
    private newWindow: Window;

    constructor(private window: Window,
                private ngZone: NgZone,
                private storage: Storage,
                private alertController: AlertController
    ) {
        this.bitbucketClientResultAsyncSubject = new AsyncSubject<BitbucketClientResult>();
        this.newWindow = null;
    }

    retrieveRawClient(clientId: string): Observable<BitbucketClientResult> {
        if (!this.bitbucketClientResultAsyncSubject.isStopped && !this.locked) {
            this.locked = true;
            this.storage.get(`accessToken-${clientId}`)
                .then(e => {
                    const value = e as BitbucketClientAccessToken;
                    if (this.isValidAccessToken(value)) {
                        const result = this.createBitbucketClientResult(value);

                        this.bitbucketClientResultAsyncSubject.next(result);
                        this.bitbucketClientResultAsyncSubject.complete();
                    } else {
                        this.openAuthorizationWindow(clientId);
                    }
                }, e => this.openAuthorizationWindow(clientId))
                .catch(e => this.openAuthorizationWindow(clientId));
        }

        return this.bitbucketClientResultAsyncSubject;
    }

    private createBitbucketClientResult(value: BitbucketClientAccessToken): BitbucketClientResult {
        const expiresIn = value.validTo.getTime() - new Date().getTime();

        return this.createResult(value.accessToken, expiresIn);
    }

    private isValidAccessToken(value: BitbucketClientAccessToken) {
        return value && value.validTo.getTime() > new Date().getTime();
    }

    private async openAuthorizationWindow(clientId: string) {
        const alert = await this.alertController.create({
            header: 'Wymagane uwierzytelnienie',
            message: 'Aby kontynuować potrzeba uwierzytelnienia w serwisie Bitbucket.',
            buttons: [
                {
                    text: 'Anuluj',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {

                    }
                }, {
                    text: 'Przejdź do Bitbucket',
                    handler: () => {
                        // @ts-ignore
                        const baseUrl = document.querySelector('head base').href;
                        const redirectUrl = encodeURIComponent(baseUrl + 'provider/bitbucket/oauth');

                        this.newWindow = window.open();
                        this.newWindow.location.assign(baseUrl + 'provider/bitbucket/redirect'
                            + `?client_id=${clientId}`
                            + `&redirect_uri=${redirectUrl}`);

                        const channel = new BroadcastChannel('bitbucketAuthorization');
                        channel.onmessage = this.onBitbucketAuthorizationMessage(channel, clientId);
                    }
                }
            ]
        });

        await alert.present();
    }

    private onBitbucketAuthorizationMessage(channel: BroadcastChannel<any>, clientId: string) {
        return msg => {
            // tslint:disable-next-line:radix
            const expiresIn = msg.expires_in && parseInt(msg.expires_in) * 1000;

            setTimeout(() => {
                this.bitbucketClientResultAsyncSubject = new AsyncSubject<BitbucketClientResult>();
            }, expiresIn);

            const resolve = () => {
                this.ngZone.run(() => {
                    const result = this.createResult(msg.access_token, expiresIn);

                    this.bitbucketClientResultAsyncSubject.next(result);
                    this.bitbucketClientResultAsyncSubject.complete();
                    channel.close();
                    this.newWindow = null;
                    this.locked = false;
                });
            };

            if (msg.access_token) {
                this.newWindow.close();
                const expirationDate = new Date(new Date().getTime() + expiresIn);
                const bitbucketClientAccessToken = new BitbucketClientAccessToken(msg.access_token, expirationDate);

                this.storage.set(`accessToken-${clientId}`, bitbucketClientAccessToken)
                    .then(() => resolve(), () => resolve())
                    .catch(() => resolve());
            }
        };
    }

    private createResult(accessToken: string, expiresIn: number) {
        const clientOptions = {
            auth: {
                token: accessToken,
            },
        };
        const bitbucket = new Bitbucket(clientOptions);
        return new BitbucketClientResult(bitbucket, expiresIn);
    }

    listWorkspaces(bitbucket: APIClient): Observable<Workspace[]> {
        return new Observable<Workspace[]>((subscriber) => {
            bitbucket.workspaces.getWorkspaces({})
                .then(workspaces => {
                    this.ngZone.run(() => {
                        subscriber.next(workspaces.data.values);
                        subscriber.complete();
                    });
                })
                .catch(err => subscriber.error(err));
        });
    }

    findWorkspaceById(bitbucket: APIClient, workspaceId: string): Observable<Workspace> {
        return new Observable<Workspace>((subscriber) => {
            bitbucket.workspaces.getWorkspace({ workspace: workspaceId})
                .then(workspace => {
                    this.ngZone.run(() => {
                        subscriber.next(workspace.data);
                        subscriber.complete();
                    });
                })
                .catch(err => subscriber.error(err));
        });
    }

    listRepositories(bitbucket: APIClient, workspace: string): Observable<Repository[]> {
        return new Observable<Repository[]>((subscriber) => {
            bitbucket.repositories.list({workspace})
                .then(repositories => {
                    this.ngZone.run(() => {
                        subscriber.next(repositories.data.values);
                        subscriber.complete();
                    });
                })
                .catch(err => subscriber.error(err));
        });
    }

    // tslint:disable-next-line:variable-name
    fetchLatestCommit(bitbucket: APIClient, workspace: string, repo_slug: string): Observable<string> {
        return new Observable<string>((subscriber) => {
            bitbucket.commits.list({
                repo_slug,
                workspace
            })
                .then(({data}) => {
                    subscriber.next(data.values[0].hash);
                    subscriber.complete();
                })
                .catch((err) => subscriber.error(err));
        });
    }
}

export class BitbucketClientResult {
    constructor(public bitbucket: APIClient, public expiresIn?: number) {
    }
}

export class BitbucketClientAccessToken {
    constructor(public accessToken: string, public validTo: Date) {
    }
}
