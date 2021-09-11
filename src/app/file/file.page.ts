import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FileSystemFacade } from '../provider/facade/file-system-facade';
import { FileSystemEntry } from '../provider/facade/model/file-system-entry';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '../provider/facade/model/file';
import { FileViewerProviderService } from './viewer/file-viewer-provider.service';
import { concatMap } from 'rxjs/operators';
import { from, Subscription } from 'rxjs';
import { FileViewer } from './viewer/file-viewer';
import { FileSystemFacadeCacheService } from '../provider/facade/file-system-facade-cache.service';
import { ToastService } from '../util/toast.service';
import { RefresherService } from '../util/refresher.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-file',
    templateUrl: 'file.page.html',
    styleUrls: ['file.page.scss']
})
export class FilePage implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('dynamic', {
        read: ViewContainerRef
    }) viewContainerRef: ViewContainerRef;
    currentViewer: FileViewer;

    fileSystemFacade: FileSystemFacade;
    file: File;

    private routeDataSubscription: Subscription;

    constructor(
        @Inject(FileViewerProviderService) private fileViewerProviderService: FileViewerProviderService,
        private route: ActivatedRoute,
        private fileSystemFacadeCacheService: FileSystemFacadeCacheService,
        private toastService: ToastService,
        private refresherService: RefresherService,
        private router: Router,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.routeDataSubscription = this.route.data.subscribe(data => {
            this.file  = data.file as File;
            this.fileSystemFacade = data.fileSystemFacade as FileSystemFacade;

            if (this.currentViewer) {
                this.currentViewer.setFile(this.file);
            }
        });
    }

    ngAfterViewInit(): void {
        this.currentViewer = this.fileViewerProviderService.addViewer(this.viewContainerRef, this.file);
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
        this.fileSystemFacadeCacheService.refresh(this.fileSystemFacade)
            .pipe(concatMap(() => {
                const path = this.file.fileSystemEntry.path + '-details';
                const asArray = path.split('/');

                return from(this.router.navigate([this.getFileSystemPrefix()].concat(asArray), {
                    skipLocationChange: true,
                    state: {
                        refreshTime: new Date()
                    }
                }));
                }),
                this.refresherService.finishRefresher($event),
                this.toastService.catchErrorAndShowToast()
            )
            .subscribe();
    }

    back(): void {
        this.location.back();
    }
}
