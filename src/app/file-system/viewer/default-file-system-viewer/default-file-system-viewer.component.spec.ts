import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DefaultFileSystemViewerComponent } from './default-file-system-viewer.component';

describe('DefaultFileSystemViewerComponent', () => {
  let component: DefaultFileSystemViewerComponent;
  let fixture: ComponentFixture<DefaultFileSystemViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultFileSystemViewerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultFileSystemViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
