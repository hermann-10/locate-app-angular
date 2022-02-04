import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcWorkoutComponent } from './parc-workout.component';

describe('ParcWorkoutComponent', () => {
  let component: ParcWorkoutComponent;
  let fixture: ComponentFixture<ParcWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcWorkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
