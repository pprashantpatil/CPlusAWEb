import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecrWorksComponent } from './projecr-works.component';

describe('ProjecrWorksComponent', () => {
  let component: ProjecrWorksComponent;
  let fixture: ComponentFixture<ProjecrWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjecrWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjecrWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
