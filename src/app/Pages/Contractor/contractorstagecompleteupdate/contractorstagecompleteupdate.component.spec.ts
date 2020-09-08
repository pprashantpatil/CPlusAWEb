import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorstagecompleteupdateComponent } from './contractorstagecompleteupdate.component';

describe('ContractorstagecompleteupdateComponent', () => {
  let component: ContractorstagecompleteupdateComponent;
  let fixture: ComponentFixture<ContractorstagecompleteupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorstagecompleteupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorstagecompleteupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
