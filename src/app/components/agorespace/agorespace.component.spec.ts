import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgorespaceComponent } from './agorespace.component';

describe('AgorespaceComponent', () => {
  let component: AgorespaceComponent;
  let fixture: ComponentFixture<AgorespaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgorespaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgorespaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
