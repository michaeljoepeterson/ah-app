import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCustomSectionComponent } from './patient-custom-section.component';

describe('PatientCustomSectionComponent', () => {
  let component: PatientCustomSectionComponent;
  let fixture: ComponentFixture<PatientCustomSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCustomSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCustomSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
