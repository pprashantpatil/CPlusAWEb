import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaintainceRequestComponent } from './update-maintaince-request.component';

describe('UpdateMaintainceRequestComponent', () => {
  let component: UpdateMaintainceRequestComponent;
  let fixture: ComponentFixture<UpdateMaintainceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMaintainceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMaintainceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
