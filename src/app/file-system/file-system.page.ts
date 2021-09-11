import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FileSystemFacade } from '../provider/facade/file-system-facade';
import { FileSystemEntry } from '../provider/facade/model/file-system-entry';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { FileSystemFacadeCacheService } from '../provider/facade/file-system-facade-cache.service';
import { ToastService } from '../util/toast.service';
import { RefresherService } from '../util/refresher.service';
import { FileSystemViewerProviderService } from './viewer/file-system-viewer-provider.service';
import { FileSystemViewer } from './viewer/file-system-viewer';

@Component({
    selector: 'app-file-system',
    templateUrl: 'file-system.page.html',
    styleUrls: ['file-system.page.scss']
})
export class FileSystemPage implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('dynamic', {
        read: ViewContainerRef
    }) viewContainerRef: ViewContainerRef;

    currentViewer: FileSystemViewer;

    fileSystemFacade: FileSystemFacade;
    fileSystemEntry: FileSystemEntry;
    nextPage: () => Observable<FileSystemEntry> = null;

    private routeDataSubscription: Subscription;

    constructor(
        @Inject(FileSystemViewerProviderService) private fileSystemViewerProviderService: FileSystemViewerProviderService,
        private route: ActivatedRoute,
        private router: Router,
        private toastService: ToastService,
        private refresherService: RefresherService,
        private fileSystemFacadeCacheService: FileSystemFacadeCacheService
    ) {
    }

    ngOnInit() {
        this.routeDataSubscription = this.route.data.subscribe(data => {
            this.fileSystemEntry = data.fileSystemEntry as FileSystemEntry;
            this.fileSystemFacade = data.fileSystemFacade as FileSystemFacade;

            if (this.viewContainerRef) {
                this.currentViewer = this.fileSystemViewerProviderService.addOrReplaceViewer(this.viewContainerRef, this.fileSystemEntry);
                this.currentViewer.setFileSystemEntry(this.fileSystemEntry);
                this.currentViewer.setFileSystemFacade(this.fileSystemFacade);
            }
            this.nextPage = this.fileSystemEntry.loadMoreEntries;
        });
    }

    ngAfterViewInit(): void {
        this.initializeCurrentViewer();
    }

    private initializeCurrentViewer() {
        this.currentViewer = this.fileSystemViewerProviderService.addOrReplaceViewer(this.viewContainerRef, this.fileSystemEntry);
        this.currentViewer.setFileSystemEntry(this.fileSystemEntry);
        this.currentViewer.setFileSystemFacade(this.fileSystemFacade);
    }

    ngOnDestroy() {
        this.routeDataSubscription.unsubscribe();
    }

    doRefresh($event: any) {
        this.fileSystemFacadeCacheService.refresh(this.fileSystemFacade)
            .pipe(concatMap(() => {
                const asArray = this.fileSystemEntry.path.split('/');

                return from(this.router.navigate([this.getFileSystemPrefix()].concat(asArray), {
                    skipLocationChange: true,
                    state: {
                        refreshTime: new Date()
                    }
                }));
            }),
            this.refresherService.finishRefresher($event),
            this.toastService.catchErrorAndShowToast()
         ).subscribe();
    }

    private getFileSystemPrefix() {
        return '/tabs/home/file-system/' + this.fileSystemEntry.dataSource.id;
    }
}
