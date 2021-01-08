import { AfterViewInit, Component, NgZone, ViewChild } from '@angular/core';
import { BitbucketClientProviderService } from '../bitbucket-client-provider.service';
import { APIClient, Schema } from 'bitbucket';
import { IonSlides, ModalController } from '@ionic/angular';
import { BitbucketConfig } from '../model/bitbucket-config';
import Workspace = Schema.Workspace;
import Repository = Schema.Repository;
import Branch = Schema.Branch;

@Component({
    selector: 'app-bitbucket-wizard',
    templateUrl: './bitbucket-wizard.component.html',
    styleUrls: ['./bitbucket-wizard.component.scss'],
})
export class BitbucketWizardComponent implements AfterViewInit {

    @ViewChild('Slides') slides: IonSlides;
    workspaces: Workspace[] = [];
    selectedWorkspace: Workspace = null;
    repositories: Repository[] = [];
    selectedRepository: Repository = null;
    selectedBranch: Branch = null;
    slideOpts = {
        initialSlide: 0,
        centeredSlides: true,
        pager: true
    };
    private bitbucket: APIClient = null;

    constructor(private window: Window,
                private ngZone: NgZone,
                private bitbucketClientProviderService: BitbucketClientProviderService,
                private modalController: ModalController
    ) {

    }

    ngAfterViewInit(): void {
        this.slides.lockSwipes(true);
    }

    authorize() {
        const clientId = 'HMEFVsQLCF9CQAKPwL';
        this.bitbucketClientProviderService.retrieveRawClient(clientId).subscribe((data) => {
            this.bitbucket = data;

            this.bitbucketClientProviderService.listWorkspaces(this.bitbucket).subscribe((workspaces) => {
                this.workspaces = workspaces;
                this.nextSlide();
            });
        });
    }

    selectWorkspace(workspace: Workspace) {
        this.selectedWorkspace = workspace;
        this.bitbucketClientProviderService.listRepositories(this.bitbucket, workspace.name).subscribe((repositories) => {
            this.repositories = repositories;
            this.nextSlide();
        });
    }

    selectRepository(repository: Repository) {
        this.selectedRepository = repository;
        this.selectedBranch = repository.mainbranch;
        this.bitbucketClientProviderService.fetchLatestCommit(this.bitbucket, this.selectedWorkspace.name, repository.name)
            .subscribe((commit) => {
                const config = new BitbucketConfig(this.selectedWorkspace,
                    this.selectedRepository,
                    this.selectedBranch,
                    commit
                );
                this.modalController.dismiss({
                    bitbucket: this.bitbucket,
                    config
                });
            });
    }

    private nextSlide() {
        this.slides.lockSwipes(false);
        this.slides.slideNext(500);

        this.slides.lockSwipes(true);

    }
}
