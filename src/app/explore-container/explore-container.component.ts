import { Component, OnInit, Input } from '@angular/core';
import { BitbucketService } from '../provider/bitbucket/bitbucket.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  entries: any[];
  constructor(private bitbucketService: BitbucketService) { }

  ngOnInit() {}

  openAuthorizeWindow() {
    this.bitbucketService.integrateNewRepository()
        .subscribe(bitbucketClient => {
          bitbucketClient.resolvePath('').subscribe(entries => {
            this.entries = entries.map(e => e.path);
          });
        });
  }
}
