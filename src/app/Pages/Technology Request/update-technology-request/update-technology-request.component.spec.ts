import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTechnologyRequestComponent } from './update-technology-request.component';

describe('UpdateTechnologyRequestComponent', () => {
  let component: UpdateTechnologyRequestComponent;
  let fixture: ComponentFixture<UpdateTechnologyRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTechnologyRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTechnologyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
