import { ComponentFactoryResolver, Inject, Injectable, Type, ViewContainerRef } from '@angular/core';
import { FileViewer } from './file-viewer';
import { DefaultFileViewerComponent } from './default-file-viewer/default-file-viewer.component';
import { File } from '../../provider/facade/model/file';

@Injectable()
export class FileViewerProviderService {

  constructor(@Inject(ComponentFactoryResolver) private factoryResolver) {}

  addViewer(viewContainerRef: ViewContainerRef, file: File) {
    const viewerComponentType: Type<FileViewer> = this.resolveComponentType();

    const factory = this.factoryResolver
        .resolveComponentFactory(viewerComponentType);
    const component = factory.create(viewContainerRef.parentInjector);

    const viewerComponent: FileViewer = component.instance as FileViewer;
    viewerComponent.setFile(file);
    viewContainerRef.insert(component.hostView);
  }

  private resolveComponentType(): Type<FileViewer> {
    const viewerComponent: Type<FileViewer> = DefaultFileViewerComponent;
    return viewerComponent;
  }
}
