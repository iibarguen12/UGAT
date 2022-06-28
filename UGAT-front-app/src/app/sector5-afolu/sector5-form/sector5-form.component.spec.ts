import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector5FormComponent } from './sector5-form.component';

describe('Sector5FormComponent', () => {
  let component: Sector5FormComponent;
  let fixture: ComponentFixture<Sector5FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector5FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector5FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
