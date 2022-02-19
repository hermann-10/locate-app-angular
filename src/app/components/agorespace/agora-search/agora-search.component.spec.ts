import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgoraSearchComponent } from './agora-search.component';

describe('AgoraSearchComponent', () => {
  let component: AgoraSearchComponent;
  let fixture: ComponentFixture<AgoraSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgoraSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgoraSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
