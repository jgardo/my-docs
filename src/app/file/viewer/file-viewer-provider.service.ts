import { ComponentFactoryResolver, Inject, Injectable, Type, ViewContainerRef } from '@angular/core';
import { FileViewer } from './file-viewer';
import { DefaultFileViewerComponent } from './default-file-viewer/default-file-viewer.component';
import { File } from '../../provider/facade/model/file';
import { MarkdownFileViewerComponent } from './markdown-file-viewer/markdown-file-viewer.component';

@Injectable()
export class FileViewerProviderService {

  constructor(@Inject(ComponentFactoryResolver) private factoryResolver) {}

  addViewer(viewContainerRef: ViewContainerRef, file: File): FileViewer {
    const viewerComponentType: Type<FileViewer> = this.resolveComponentType(file);

    const factory = this.factoryResolver
        .resolveComponentFactory(viewerComponentType);
    const component = factory.create(viewContainerRef.parentInjector);

    const viewerComponent: FileViewer = component.instance as FileViewer;
    viewerComponent.setFile(file);
    viewContainerRef.insert(component.hostView);

    return viewerComponent;
  }

  private resolveComponentType(file: File): Type<FileViewer> {
    if (file.fileSystemEntry.name.endsWith('.md')) {
      return MarkdownFileViewerComponent;
    }
    return DefaultFileViewerComponent;
  }
}
