import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bitbucket-redirect',
  templateUrl: './bitbucket-redirect.component.html',
  styleUrls: ['./bitbucket-redirect.component.scss'],
})
export class BitbucketRedirectComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const clientId = this.route.snapshot.queryParamMap.get('client_id');
    const redirectUrl = this.route.snapshot.queryParamMap.get('redirect_uri');
    const url = 'https://bitbucket.org/site/oauth2/authorize'
        + `?client_id=${clientId}`
        + `&response_type=token`
        + `&redirect_uri=${redirectUrl}`;

    window.location.assign(url);
  }

}
