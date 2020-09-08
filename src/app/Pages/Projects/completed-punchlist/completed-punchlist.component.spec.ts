import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedPunchlistComponent } from './completed-punchlist.component';

describe('CompletedPunchlistComponent', () => {
  let component: CompletedPunchlistComponent;
  let fixture: ComponentFixture<CompletedPunchlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedPunchlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedPunchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
