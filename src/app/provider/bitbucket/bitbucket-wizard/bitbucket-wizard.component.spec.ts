import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BitbucketWizardComponent } from './bitbucket-wizard.component';

describe('BitbucketWizardComponent', () => {
    let component: BitbucketWizardComponent;
    let fixture: ComponentFixture<BitbucketWizardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BitbucketWizardComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(BitbucketWizardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
