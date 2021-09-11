import { ComponentFactoryResolver, Inject, Injectable, Type, ViewContainerRef } from '@angular/core';
import { FileSystemViewer } from './file-system-viewer';
import { DefaultFileSystemViewerComponent } from './default-file-system-viewer/default-file-system-viewer.component';
import { FileSystemEntry } from '../../provider/facade/model/file-system-entry';

@Injectable()
export class FileSystemViewerProviderService {

  constructor(@Inject(ComponentFactoryResolver) private factoryResolver) {}

  addViewer(viewContainerRef: ViewContainerRef, fileSystemEntry: FileSystemEntry): FileSystemViewer {
    const viewerComponentType: Type<FileSystemViewer> = this.resolveComponentType(fileSystemEntry);

    const factory = this.factoryResolver
        .resolveComponentFactory(viewerComponentType);
    const component = factory.create(viewContainerRef.parentInjector);

    const viewerComponent: FileSystemViewer = component.instance as FileSystemViewer;
    viewerComponent.setFileSystemEntry(fileSystemEntry);
    viewContainerRef.insert(component.hostView);

    return viewerComponent;
  }

  private resolveComponentType(fileSystemEntry: FileSystemEntry): Type<FileSystemViewer> {
    return DefaultFileSystemViewerComponent;
  }
}
