import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FileSystemViewer } from '../file-system-viewer';
import { FileSystemEntry } from '../../../provider/facade/model/file-system-entry';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../util/toast.service';
import { FileSystemFacade } from '../../../provider/facade/file-system-facade';

@Component({
  selector: 'app-example-custom-file-system-viewer',
  templateUrl: './example-custom-file-system-viewer.component.html',
  styleUrls: ['./example-custom-file-system-viewer.component.scss'],
})
export class ExampleCustomFileSystemViewerComponent implements OnInit, AfterViewInit, OnDestroy, FileSystemViewer {

  content: string;
  fileSystemFacade: FileSystemFacade;
  fileSystemEntry: FileSystemEntry;
  fileSystemIndexEntry: FileSystemEntry;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private toastService: ToastService
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
  }

  setFileSystemEntry(fileSystemEntry: FileSystemEntry) {
    this.fileSystemEntry = fileSystemEntry;
    this.fileSystemIndexEntry = this.fileSystemEntry.entries
        .filter((e) => e.name === '_index-example.json')[0];
  }

  setFileSystemFacade(fileSystemFacade: FileSystemFacade) {
    this.fileSystemFacade = fileSystemFacade;
    this.fileSystemFacade.resolveFile(this.fileSystemIndexEntry.path)
        .subscribe((file) => {
          this.content = file.content;
        });
  }
}
