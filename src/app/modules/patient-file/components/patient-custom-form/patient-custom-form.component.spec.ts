import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCustomFormComponent } from './patient-custom-form.component';

describe('PatientCustomFormComponent', () => {
  let component: PatientCustomFormComponent;
  let fixture: ComponentFixture<PatientCustomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCustomFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCustomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
