import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector2FormComponent } from './sector2-form.component';

describe('Sector2FormComponent', () => {
  let component: Sector2FormComponent;
  let fixture: ComponentFixture<Sector2FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector2FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
