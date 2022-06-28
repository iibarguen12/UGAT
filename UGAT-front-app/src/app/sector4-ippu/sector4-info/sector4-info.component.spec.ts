import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector4InfoComponent } from './sector4-info.component';

describe('Sector4InfoComponent', () => {
  let component: Sector4InfoComponent;
  let fixture: ComponentFixture<Sector4InfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector4InfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector4InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
