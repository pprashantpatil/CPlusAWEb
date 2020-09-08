import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecrWorksdashComponent } from './projecr-worksdash.component';

describe('ProjecrWorksdashComponent', () => {
  let component: ProjecrWorksdashComponent;
  let fixture: ComponentFixture<ProjecrWorksdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjecrWorksdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjecrWorksdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
