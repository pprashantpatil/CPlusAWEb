import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenteesComponent } from './absentees.component';

describe('AbsenteesComponent', () => {
  let component: AbsenteesComponent;
  let fixture: ComponentFixture<AbsenteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
