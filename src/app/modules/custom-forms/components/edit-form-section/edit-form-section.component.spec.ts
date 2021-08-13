import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormSectionComponent } from './edit-form-section.component';

describe('EditFormSectionComponent', () => {
  let component: EditFormSectionComponent;
  let fixture: ComponentFixture<EditFormSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
