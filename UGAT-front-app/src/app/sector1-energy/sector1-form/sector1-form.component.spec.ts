import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector1FormComponent } from './sector1-form.component';

describe('Sector1FormComponent', () => {
  let component: Sector1FormComponent;
  let fixture: ComponentFixture<Sector1FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector1FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
