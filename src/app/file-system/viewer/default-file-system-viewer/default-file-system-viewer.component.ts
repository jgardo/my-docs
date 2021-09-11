import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FileSystemViewer } from '../file-system-viewer';
import { FileSystemEntry } from '../../../provider/facade/model/file-system-entry';
import { IonInfiniteScroll } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../util/toast.service';
import { FileSystemFacade } from '../../../provider/facade/file-system-facade';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-default-file-system-viewer',
  templateUrl: './default-file-system-viewer.component.html',
  styleUrls: ['./default-file-system-viewer.component.scss'],
})
export class DefaultFileSystemViewerComponent implements OnInit, AfterViewInit, FileSystemViewer {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  fileSystemFacade: FileSystemFacade;
  fileSystemEntry: FileSystemEntry;
  nextPage: () => Observable<FileSystemEntry> = null;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private toastService: ToastService
  ) {
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.handleInitialInfiniteScroll();
  }

  private handleInitialInfiniteScroll() {
    if (this.infiniteScroll && this.fileSystemEntry) {
      this.infiniteScroll.disabled = !this.fileSystemEntry.loadMoreEntries;
    }
  }

  setFileSystemEntry(fileSystemEntry: FileSystemEntry) {
    this.fileSystemEntry = fileSystemEntry as FileSystemEntry;
    this.nextPage = this.fileSystemEntry.loadMoreEntries;
    this.handleInitialInfiniteScroll();
  }

  setFileSystemFacade(fileSystemFacade: FileSystemFacade) {
    this.fileSystemFacade = fileSystemFacade as FileSystemFacade;
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
}
