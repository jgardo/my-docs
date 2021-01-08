import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {BroadcastChannel} from 'broadcast-channel';
import {APIClient, Bitbucket, Schema} from 'bitbucket';
import Workspace = Schema.Workspace;
import Repository = Schema.Repository;

@Injectable({
  providedIn: 'root'
})
export class BitbucketClientProviderService {

  constructor(private window: Window,
              private ngZone: NgZone) { }


  retrieveRawClient(clientId: string): Observable<APIClient> {
    return new Observable(subscriber => {
      const redirectUrl = encodeURIComponent(this.window.location.origin + '/provider/bitbucket/oauth');
      const newWindow = this.window.open('https://bitbucket.org/site/oauth2/authorize'
          + `?client_id=${clientId}`
          + `&response_type=token`
          + `&redirect_uri=${redirectUrl}`);

      const channel = new BroadcastChannel('bitbucketAuthorization');
      channel.onmessage = msg => {
        if (msg.access_token) {
          newWindow.close();
          this.ngZone.run(() => {
            const clientOptions = {
              auth: {
                token: msg.access_token,
              },
            };

            const bitbucket = new Bitbucket(clientOptions);
            subscriber.next(bitbucket);
            subscriber.complete();
            channel.close();
          });
        }
      };
    });
  }

  listWorkspaces(bitbucket: APIClient): Observable<Workspace[]> {
    return new Observable<Workspace[]>((subscriber) => {
      bitbucket.workspaces.getWorkspaces({ })
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
      bitbucket.repositories.list({ workspace })
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
          .then(({ data }) => {
            subscriber.next(data.values[0].hash);
            subscriber.complete();
          })
          .catch((err) => subscriber.error(err));
    });
  }
}
