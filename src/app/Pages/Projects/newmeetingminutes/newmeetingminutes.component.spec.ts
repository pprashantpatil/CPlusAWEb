import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmeetingminutesComponent } from './newmeetingminutes.component';

describe('NewmeetingminutesComponent', () => {
  let component: NewmeetingminutesComponent;
  let fixture: ComponentFixture<NewmeetingminutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewmeetingminutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmeetingminutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
