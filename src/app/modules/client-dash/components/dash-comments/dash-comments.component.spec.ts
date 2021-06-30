import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCommentsComponent } from './dash-comments.component';

describe('DashCommentsComponent', () => {
  let component: DashCommentsComponent;
  let fixture: ComponentFixture<DashCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
