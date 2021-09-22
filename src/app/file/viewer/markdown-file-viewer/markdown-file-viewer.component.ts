import { Component, OnInit } from '@angular/core';
import { FileViewer } from '../file-viewer';
import { File } from '../../../provider/facade/model/file';

@Component({
  selector: 'app-markdown-file-viewer',
  templateUrl: './markdown-file-viewer.component.html',
  styleUrls: ['./markdown-file-viewer.component.scss'],
})
export class MarkdownFileViewerComponent implements OnInit, FileViewer {

  file: File;
  options: any;
  postRender: any;

  constructor() {
    this.options = {
      enablePreviewContentClick: true
    };
    // tslint:disable-next-line:variable-name
    this.postRender = (string) => {
      return string.replaceAll('<a href', '<a target="_blank" href');
    };
  }

  ngOnInit() {}

  setFile(file: File) {
    this.file = file;
  }
}
