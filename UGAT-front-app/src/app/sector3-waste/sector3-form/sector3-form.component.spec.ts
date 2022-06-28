import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector3FormComponent } from './sector3-form.component';

describe('Sector3FormComponent', () => {
  let component: Sector3FormComponent;
  let fixture: ComponentFixture<Sector3FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector3FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector3FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
