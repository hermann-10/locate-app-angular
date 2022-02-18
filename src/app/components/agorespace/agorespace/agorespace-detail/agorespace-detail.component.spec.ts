import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgorespaceDetailComponent } from './agorespace-detail.component';

describe('AgorespaceDetailComponent', () => {
  let component: AgorespaceDetailComponent;
  let fixture: ComponentFixture<AgorespaceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgorespaceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgorespaceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
