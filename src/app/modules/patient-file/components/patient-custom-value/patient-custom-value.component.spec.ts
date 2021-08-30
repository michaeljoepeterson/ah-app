import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCustomValueComponent } from './patient-custom-value.component';

describe('PatientCustomValueComponent', () => {
  let component: PatientCustomValueComponent;
  let fixture: ComponentFixture<PatientCustomValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCustomValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCustomValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
