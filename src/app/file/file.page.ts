import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FileSystemFacade } from '../provider/facade/file-system-facade';
import { FileSystemEntry } from '../provider/facade/model/file-system-entry';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '../provider/facade/model/file';
import { FileViewerProviderService } from './viewer/file-viewer-provider.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FileViewer } from './viewer/file-viewer';

@Component({
    selector: 'app-file',
    templateUrl: 'file.page.html',
    styleUrls: ['file.page.scss']
})
export class FilePage implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('dynamic', {
        read: ViewContainerRef
    }) viewContainerRef: ViewContainerRef;

    fileSystemFacade: FileSystemFacade;
    file: File;

    currentViever: FileViewer;

    private routeDataSubscription: Subscription;

    constructor(
        @Inject(FileViewerProviderService) private fileViewerProviderService: FileViewerProviderService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngAfterViewInit(): void {
        this.currentViever = this.fileViewerProviderService.addViewer(this.viewContainerRef, this.file);
    }

    ngOnInit() {
        this.routeDataSubscription = this.route.data.subscribe(data => {
            this.file  = data.file as File;
            this.fileSystemFacade = data.fileSystemFacade as FileSystemFacade;

            if (this.currentViever) {
                this.currentViever.setFile(this.file);
            }
        });
    }

    ngOnDestroy() {
        this.routeDataSubscription.unsubscribe();
    }

    goToItem(item: FileSystemEntry) {
        const asArray = item.path.substr(1).split('/');
        this.router.navigate([this.getFileSystemPrefix()].concat(asArray));
    }

    private getFileSystemPrefix() {
        return '/tabs/home/file-system/' + this.file.fileSystemEntry.dataSource.id;
    }

    doRefresh($event: any) {
        this.fileSystemFacade.refresh()
            .pipe(map(() => {
                const path = this.file.fileSystemEntry.path + '-details';
                const asArray = path.split('/');

                this.router.navigate([this.getFileSystemPrefix()].concat(asArray), {
                    skipLocationChange: true,
                    state: {
                        refreshTime: new Date()
                    }
                })
                    .catch(e => ''/* TODO */)
                    .finally(() => $event.target.complete());
            }))
            .subscribe();
    }
}
