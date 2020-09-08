import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMasterDetailsComponent } from './leave-master-details.component';

describe('LeaveMasterDetailsComponent', () => {
  let component: LeaveMasterDetailsComponent;
  let fixture: ComponentFixture<LeaveMasterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveMasterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
