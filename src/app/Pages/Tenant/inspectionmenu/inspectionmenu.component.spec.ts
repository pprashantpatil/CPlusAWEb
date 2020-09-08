import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionmenuComponent } from './inspectionmenu.component';

describe('InspectionmenuComponent', () => {
  let component: InspectionmenuComponent;
  let fixture: ComponentFixture<InspectionmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
