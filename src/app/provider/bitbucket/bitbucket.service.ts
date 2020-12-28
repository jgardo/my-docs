import {Injectable, NgZone} from '@angular/core';
import { Observable } from 'rxjs';
import { BitbucketClient } from './bitbucket-client';
import { BroadcastChannel } from 'broadcast-channel';

@Injectable({
  providedIn: 'root'
})
export class BitbucketService {

  constructor(private window: Window,
              private ngZone: NgZone) { }

  retrieveClient(clientId: string): Observable<BitbucketClient> {
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
            subscriber.next(new BitbucketClient(msg.access_token));
            subscriber.complete();
            channel.close();
          });
        }
      };
    });
  }
}
