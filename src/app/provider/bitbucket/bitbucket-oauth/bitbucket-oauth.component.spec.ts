import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BitbucketOauthComponent } from './bitbucket-oauth.component';

describe('BitbucketOauthComponent', () => {
    let component: BitbucketOauthComponent;
    let fixture: ComponentFixture<BitbucketOauthComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BitbucketOauthComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(BitbucketOauthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
