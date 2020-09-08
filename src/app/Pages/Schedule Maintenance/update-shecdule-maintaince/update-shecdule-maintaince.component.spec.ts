import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShecduleMaintainceComponent } from './update-shecdule-maintaince.component';

describe('UpdateShecduleMaintainceComponent', () => {
  let component: UpdateShecduleMaintainceComponent;
  let fixture: ComponentFixture<UpdateShecduleMaintainceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateShecduleMaintainceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateShecduleMaintainceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
