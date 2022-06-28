import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector4IPPUComponent } from './sector4-ippu.component';

describe('Sector4IPPUComponent', () => {
  let component: Sector4IPPUComponent;
  let fixture: ComponentFixture<Sector4IPPUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector4IPPUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector4IPPUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
