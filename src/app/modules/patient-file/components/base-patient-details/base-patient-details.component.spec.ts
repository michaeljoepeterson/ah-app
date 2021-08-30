import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePatientDetailsComponent } from './base-patient-details.component';

describe('BasePatientDetailsComponent', () => {
  let component: BasePatientDetailsComponent;
  let fixture: ComponentFixture<BasePatientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasePatientDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
