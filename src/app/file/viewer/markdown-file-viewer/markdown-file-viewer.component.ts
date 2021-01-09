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

  constructor() { }

  ngOnInit() {}

  setFile(file: File) {
    this.file = file;

  }
}
