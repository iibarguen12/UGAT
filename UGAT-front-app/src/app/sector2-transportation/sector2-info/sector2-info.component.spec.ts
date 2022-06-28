import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector2InfoComponent } from './sector2-info.component';

describe('Sector2InfoComponent', () => {
  let component: Sector2InfoComponent;
  let fixture: ComponentFixture<Sector2InfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector2InfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector2InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
