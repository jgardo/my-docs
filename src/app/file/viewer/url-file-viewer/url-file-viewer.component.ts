import { Component, OnInit } from '@angular/core';
import { FileViewer } from '../file-viewer';
import { File } from '../../../provider/facade/model/file';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActionSheetController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-url-file-viewer',
  templateUrl: './url-file-viewer.component.html',
  styleUrls: ['./url-file-viewer.component.scss'],
})
export class UrlFileViewerComponent implements OnInit, FileViewer {
  file: File;
  url: string;
  mode: 'unknown' | 'in-app' | 'in-browser' = 'unknown';
  sanitizedUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer,
              private actionSheetController: ActionSheetController,
              private location: Location) { }

  private static calculateUrl(content: string): string {
    const lines = content.split('\n');
    const urlRecord = lines.filter(s => s.startsWith('URL'))[0];

    return urlRecord.substr(urlRecord.indexOf('=') + 1).trim();
  }

  ngOnInit() {
    this.presentActionSheet();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Url',
      buttons: [{
        text: 'Otwórz w nowym oknie',
        role: 'selected',
        icon: 'open',
        handler: () => {
          this.mode = 'in-browser';
          this.openInBrowser();
        }
      }, {
        text: 'Otwórz w aplikacji',
        icon: 'eye',
        handler: () => {
          this.mode = 'in-app';
        }
      }, {
        text: 'Anuluj',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this.location.back();
        }
      }]
    });
    await actionSheet.present();
  }

  setFile(file: File) {
    this.file = file;
    this.url = UrlFileViewerComponent.calculateUrl(file.content);
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  openInBrowser() {
    window.open(this.url);
  }
}
