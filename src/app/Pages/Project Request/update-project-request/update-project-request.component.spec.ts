import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectRequestComponent } from './update-project-request.component';

describe('UpdateProjectRequestComponent', () => {
  let component: UpdateProjectRequestComponent;
  let fixture: ComponentFixture<UpdateProjectRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProjectRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProjectRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
