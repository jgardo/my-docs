import { Injectable, NgZone } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';
import { BroadcastChannel } from 'broadcast-channel';
import { APIClient, Bitbucket, Schema } from 'bitbucket';
import Workspace = Schema.Workspace;
import Repository = Schema.Repository;

@Injectable({
    providedIn: 'root'
})
export class BitbucketClientProviderService {

    private bitbucketClientResultAsyncSubject: AsyncSubject<BitbucketClientResult>;
    private newWindow: Window;

    constructor(private window: Window,
                private ngZone: NgZone) {
        this.bitbucketClientResultAsyncSubject = new AsyncSubject<BitbucketClientResult>();
        this.newWindow = null;
    }

    retrieveRawClient(clientId: string): Observable<BitbucketClientResult> {
        if (!this.bitbucketClientResultAsyncSubject.isStopped && this.newWindow === null) {
            const redirectUrl = encodeURIComponent(this.window.location.origin + '/provider/bitbucket/oauth');
            this.newWindow = this.window.open('https://bitbucket.org/site/oauth2/authorize'
                + `?client_id=${clientId}`
                + `&response_type=token`
                + `&redirect_uri=${redirectUrl}`);

            const channel = new BroadcastChannel('bitbucketAuthorization');
            channel.onmessage = msg => {
                // tslint:disable-next-line:radix
                const expiresIn = msg.expires_in && parseInt(msg.expires_in) * 1000;

                setTimeout(() => {
                    this.bitbucketClientResultAsyncSubject = new AsyncSubject<BitbucketClientResult>();
                }, expiresIn);
                if (msg.access_token) {
                    this.newWindow.close();
                    this.ngZone.run(() => {
                        const clientOptions = {
                            auth: {
                                token: msg.access_token,
                            },
                        };

                        const bitbucket = new Bitbucket(clientOptions);

                        const result = new BitbucketClientResult(bitbucket, expiresIn);

                        this.bitbucketClientResultAsyncSubject.next(result);
                        this.bitbucketClientResultAsyncSubject.complete();
                        channel.close();
                        this.newWindow = null;
                    });
                }
            };
        }

        return this.bitbucketClientResultAsyncSubject;
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
