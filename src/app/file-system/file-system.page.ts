import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FileSystemFacade } from '../provider/facade/file-system-facade';
import { FileSystemEntry } from '../provider/facade/model/file-system-entry';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, Subscription, throwError } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { FileSystemFacadeCacheService } from '../provider/facade/file-system-facade-cache.service';
import { ToastService } from '../util/toast.service';
import { RefresherService } from '../util/refresher.service';

@Component({
    selector: 'app-file-system',
    templateUrl: 'file-system.page.html',
    styleUrls: ['file-system.page.scss']
})
export class FileSystemPage implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    fileSystemFacade: FileSystemFacade;
    fileSystemEntry: FileSystemEntry;
    nextPage: () => Observable<FileSystemEntry> = null;

    private routeDataSubscription: Subscription;

    constructor(
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

            this.nextPage = this.fileSystemEntry.loadMoreEntries;
        });
    }

    ngAfterViewInit(): void {
        this.routeDataSubscription = this.route.data.subscribe(() => {
            this.infiniteScroll.disabled = !this.fileSystemEntry.loadMoreEntries;
        });
    }

    ngOnDestroy() {
        this.routeDataSubscription.unsubscribe();
    }

    goToItem(item: FileSystemEntry) {
        this.router.navigate(this.itemPath(item));
    }

    itemPath(item: FileSystemEntry) {
        const asArray = item.path.substr(1).split('/');

        const fileSystemPrefix = this.getFileSystemPrefix();

        asArray[asArray.length - 1] = asArray[asArray.length - 1] +
            (item.type === 'FILE' ? '-details' : '');
        return [fileSystemPrefix].concat(asArray);
    }

    goBack() {
        this.router.navigate(this.backPath());
    }

    backPath() {
        const parentPath = this.fileSystemEntry.path
            .substr(0, this.fileSystemEntry.path.lastIndexOf('/'))
            .substr(1);
        const asArray = parentPath.split('/');

        return [this.getFileSystemPrefix()].concat(asArray);
    }

    private getFileSystemPrefix() {
        return '/tabs/home/file-system/' + this.fileSystemEntry.dataSource.id;
    }

    loadData($event: any) {
        this.nextPage()
            .pipe(
                tap(fse => {
                    this.nextPage = fse.loadMoreEntries;
                    this.fileSystemEntry.entries.push(...fse.entries);

                    $event.target.complete();
                    if (!this.nextPage) {
                        $event.target.disabled = true;
                    }
                }),
                this.toastService.catchErrorAndShowToast(),
                catchError(err => {
                    $event.target.complete();
                    return throwError(err);
                })
            )
        .subscribe();
    }

    doRefresh($event: any) {
        this.fileSystemFacadeCacheService.refresh(this.fileSystemFacade)
            .pipe(mergeMap(() => {
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
}
