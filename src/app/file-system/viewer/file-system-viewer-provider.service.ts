import { ComponentFactoryResolver, Inject, Injectable, Type, ViewContainerRef } from '@angular/core';
import { FileSystemViewer } from './file-system-viewer';
import { DefaultFileSystemViewerComponent } from './default-file-system-viewer/default-file-system-viewer.component';
import { FileSystemEntry } from '../../provider/facade/model/file-system-entry';
import { ExampleCustomFileSystemViewerComponent } from './example-custom-file-system-viewer/example-custom-file-system-viewer.component';

@Injectable()
export class FileSystemViewerProviderService {

  constructor(@Inject(ComponentFactoryResolver) private factoryResolver) {}

  addOrReplaceViewer(viewContainerRef: ViewContainerRef, fileSystemEntry: FileSystemEntry): FileSystemViewer {
    const viewerComponentType: Type<FileSystemViewer> = this.resolveComponentType(fileSystemEntry);

    const factory = this.factoryResolver
        .resolveComponentFactory(viewerComponentType);
    const component = factory.create(viewContainerRef.parentInjector);

    const viewerComponent: FileSystemViewer = component.instance as FileSystemViewer;
    viewerComponent.setFileSystemEntry(fileSystemEntry);

    if (viewContainerRef.length === 1) {
      viewContainerRef.remove(0);
    }
    viewContainerRef.insert(component.hostView);

    return viewerComponent;
  }

  private resolveComponentType(fileSystemEntry: FileSystemEntry): Type<FileSystemViewer> {
    const indexJsonEntries = fileSystemEntry.entries
        .filter((e) => e.name.startsWith('_index-') && e.name.endsWith('.json'));
    const viewerNames = indexJsonEntries
        .map(e => e.name)
        .map(name => name.substr('_index-'.length, name.length - '_index-'.length - '.json'.length));

    if (viewerNames.length === 0) {
      return DefaultFileSystemViewerComponent;
    } else {
      switch (viewerNames[0]) {
        case 'example':
          return ExampleCustomFileSystemViewerComponent;
        default:
          return DefaultFileSystemViewerComponent;
      }
    }
  }
}
