import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector4FormComponent } from './sector4-form.component';

describe('Sector4FormComponent', () => {
  let component: Sector4FormComponent;
  let fixture: ComponentFixture<Sector4FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector4FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector4FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
