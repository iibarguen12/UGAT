import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector1InfoComponent } from './sector1-info.component';

describe('Sector1InfoComponent', () => {
  let component: Sector1InfoComponent;
  let fixture: ComponentFixture<Sector1InfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector1InfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector1InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
