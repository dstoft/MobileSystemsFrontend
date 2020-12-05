import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStatsComponent } from './trip-stats.component';

describe('TripStatsComponent', () => {
  let component: TripStatsComponent;
  let fixture: ComponentFixture<TripStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
