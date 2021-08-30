import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCustomValuesComponent } from './patient-custom-values.component';

describe('PatientCustomValuesComponent', () => {
  let component: PatientCustomValuesComponent;
  let fixture: ComponentFixture<PatientCustomValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCustomValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCustomValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
