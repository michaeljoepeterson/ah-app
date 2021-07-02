import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashItemDetailsComponent } from './dash-item-details.component';

describe('DashItemDetailsComponent', () => {
  let component: DashItemDetailsComponent;
  let fixture: ComponentFixture<DashItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
