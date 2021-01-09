import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FileSystemFacade } from '../provider/facade/file-system-facade';
import { FileSystemEntry } from '../provider/facade/model/file-system-entry';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '../provider/facade/model/file';
import { FileViewerProviderService } from './viewer/file-viewer-provider.service';

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

    constructor(
        @Inject(FileViewerProviderService) private fileViewerProviderService: FileViewerProviderService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngAfterViewInit(): void {
        this.fileViewerProviderService.addViewer(this.viewContainerRef, this.file);
    }

    ngOnInit() {
        this.file  = this.route.snapshot.data.file as File;
    }

    ngOnDestroy() {
    }

    goToItem(item: FileSystemEntry) {
        const asArray = item.path.substr(1).split('/');
        this.router.navigate(['/tabs/file/bb-jg-docs-recipes-data'].concat(asArray));
    }
}
