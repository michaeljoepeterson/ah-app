import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartListItemComponent } from './chart-list-item.component';

describe('ChartListItemComponent', () => {
  let component: ChartListItemComponent;
  let fixture: ComponentFixture<ChartListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
