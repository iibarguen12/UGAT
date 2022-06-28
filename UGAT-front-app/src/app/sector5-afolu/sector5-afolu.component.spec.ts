import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sector5AFOLUComponent } from './sector5-afolu.component';

describe('Sector5AFOLUComponent', () => {
  let component: Sector5AFOLUComponent;
  let fixture: ComponentFixture<Sector5AFOLUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sector5AFOLUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sector5AFOLUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
