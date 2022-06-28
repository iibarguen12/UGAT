import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector3WasteComponent } from './sector3-waste.component';

describe('Sector3WasteComponent', () => {
  let component: Sector3WasteComponent;
  let fixture: ComponentFixture<Sector3WasteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector3WasteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector3WasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
