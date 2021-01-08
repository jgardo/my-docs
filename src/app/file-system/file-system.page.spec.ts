import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FileSystemPage } from './file-system.page';

describe('FileSystemPage', () => {
    let component: FileSystemPage;
    let fixture: ComponentFixture<FileSystemPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FileSystemPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(FileSystemPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
