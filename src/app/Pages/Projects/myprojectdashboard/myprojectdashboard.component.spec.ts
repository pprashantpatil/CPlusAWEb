import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprojectdashboardComponent } from './myprojectdashboard.component';

describe('MyprojectdashboardComponent', () => {
  let component: MyprojectdashboardComponent;
  let fixture: ComponentFixture<MyprojectdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprojectdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprojectdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
