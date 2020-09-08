import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardPrjectBidComponent } from './award-prject-bid.component';

describe('AwardPrjectBidComponent', () => {
  let component: AwardPrjectBidComponent;
  let fixture: ComponentFixture<AwardPrjectBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardPrjectBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardPrjectBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
