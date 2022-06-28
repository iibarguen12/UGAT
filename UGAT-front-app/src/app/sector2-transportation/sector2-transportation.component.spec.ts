import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector2TransportationComponent } from './sector2-transportation.component';

describe('Sector2TransportationComponent', () => {
  let component: Sector2TransportationComponent;
  let fixture: ComponentFixture<Sector2TransportationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector2TransportationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector2TransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
