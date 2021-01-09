import { Component, OnInit } from '@angular/core';
import { FileViewer } from '../file-viewer';
import { File } from '../../../provider/facade/model/file';

@Component({
  selector: 'app-default-file-viewer',
  templateUrl: './default-file-viewer.component.html',
  styleUrls: ['./default-file-viewer.component.scss'],
})
export class DefaultFileViewerComponent implements FileViewer, OnInit {

  file: File;

  constructor() { }

  ngOnInit() {}

  setFile(file: File) {
    this.file = file;
  }
}
