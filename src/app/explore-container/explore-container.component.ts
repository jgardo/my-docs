import { Component, OnInit, Input } from '@angular/core';
import { BitbucketService } from '../provider/bitbucket/bitbucket.service';
import { BitbucketClient } from '../provider/bitbucket/bitbucket-client';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  private bitbucketClient: BitbucketClient = null;
  repoNames: Array<string> = [];

  constructor(private bitbucketService: BitbucketService) { }

  ngOnInit() {}

  openAuthorizeWindow() {
    const clientId = 'HMEFVsQLCF9CQAKPwL';
    this.bitbucketService.retrieveClient(clientId).subscribe((data) => {
      this.bitbucketClient = data;

      this.bitbucketClient.initialize().subscribe((repos) => {
        // this.bitbucketClient.listAllRepos().subscribe((repos) => {
        //   this.repoNames = repos.map(repo => repo.toString());
        // });
      });
    });
  }
}
