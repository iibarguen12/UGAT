import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector3InfoComponent } from './sector3-info.component';

describe('Sector3InfoComponent', () => {
  let component: Sector3InfoComponent;
  let fixture: ComponentFixture<Sector3InfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector3InfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector3InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
