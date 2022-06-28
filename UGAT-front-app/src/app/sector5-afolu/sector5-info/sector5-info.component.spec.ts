import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector5InfoComponent } from './sector5-info.component';

describe('Sector5InfoComponent', () => {
  let component: Sector5InfoComponent;
  let fixture: ComponentFixture<Sector5InfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector5InfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector5InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
