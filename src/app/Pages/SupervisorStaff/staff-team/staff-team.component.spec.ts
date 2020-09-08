import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffTeamComponent } from './staff-team.component';

describe('StaffTeamComponent', () => {
  let component: StaffTeamComponent;
  let fixture: ComponentFixture<StaffTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
