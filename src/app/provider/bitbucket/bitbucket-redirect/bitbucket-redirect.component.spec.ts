import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BitbucketRedirectComponent } from './bitbucket-redirect.component';

describe('BitbucketRedirectComponent', () => {
  let component: BitbucketRedirectComponent;
  let fixture: ComponentFixture<BitbucketRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitbucketRedirectComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BitbucketRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
