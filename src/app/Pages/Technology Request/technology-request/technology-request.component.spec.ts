import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyRequestComponent } from './technology-request.component';

describe('TechnologyRequestComponent', () => {
  let component: TechnologyRequestComponent;
  let fixture: ComponentFixture<TechnologyRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologyRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
