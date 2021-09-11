import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExampleCustomFileSystemViewerComponent } from './example-custom-file-system-viewer.component';

describe('ExampleCustomFileSystemViewerComponent', () => {
  let component: ExampleCustomFileSystemViewerComponent;
  let fixture: ComponentFixture<ExampleCustomFileSystemViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleCustomFileSystemViewerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleCustomFileSystemViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
