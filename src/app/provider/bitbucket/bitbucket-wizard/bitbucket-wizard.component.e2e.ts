import { AfterViewInit, Component, NgZone, ViewChild } from '@angular/core';
import { BitbucketClientProviderService } from '../bitbucket-client-provider.service';
import { APIClient, Bitbucket, Schema } from 'bitbucket';
import { IonSlides, ModalController } from '@ionic/angular';
import { BitbucketConfig } from '../model/bitbucket-config';
import { AsyncResponse, Params } from 'bitbucket/lib/bitbucket';
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
        this.slides.lockSwipeToNext(true);
    }

    authorize() {
        const clientOptions = {
            auth: {
                token: '',
            },
        };
        const bitbucket = new Bitbucket(clientOptions);
        this.bitbucket = bitbucket;

        const mockedWorkspaces: Workspace[] = [{
            created_on: '2021-01-23T12:28:14.533559+00:00',
            is_private: false,
            name: 'jg-docs-test',
            slug: 'jg-docs-test',
            type: 'workspace',
            uuid: '{d460169b-59c7-4b6d-b262-355bc8db5be0}',
        }];

        const responseBody: Schema.PaginatedWorkspaces = {
            values: mockedWorkspaces
        };

        bitbucket.workspaces.getWorkspaces = (params: Params.WorkspacesGetWorkspaces) => {
            const response: AsyncResponse<Schema.PaginatedWorkspaces> = Promise.resolve({
                data: responseBody,
                headers: {},
                status: 200,
                url: ''
            });
            return response;
        };


        this.bitbucketClientProviderService.listWorkspaces(this.bitbucket).subscribe((workspaces) => {
            this.workspaces = workspaces;
            this.nextSlide();
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
        this.slides.lockSwipeToNext(false);
        this.slides.slideNext(500);

        this.slides.lockSwipeToNext(true);

    }

    dismissModal() {
        this.modalController.dismiss();
    }
}
