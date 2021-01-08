import { Component, OnInit } from '@angular/core';
import { BroadcastChannel } from 'broadcast-channel';

@Component({
    selector: 'app-bitbucket-oauth',
    templateUrl: './bitbucket-oauth.component.html',
    styleUrls: ['./bitbucket-oauth.component.scss'],
})
export class BitbucketOauthComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        const hashParams: any = window.location.hash.substring(1).split('&');
        const paramsAsMap: any = hashParams.reduce((obj, item) => {
            const pair = item.split('=');
            obj[pair[0]] = pair[1];
            return obj;
        }, {});
        const accessToken = paramsAsMap.access_token;
        console.log(accessToken);

        const channel = new BroadcastChannel('bitbucketAuthorization');
        channel.postMessage(paramsAsMap);
    }
}
