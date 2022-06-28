import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector1EnergyComponent } from './sector1-energy.component';

describe('Sector1EnergyComponent', () => {
  let component: Sector1EnergyComponent;
  let fixture: ComponentFixture<Sector1EnergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector1EnergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector1EnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
