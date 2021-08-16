import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditControlsComponent } from './form-edit-controls.component';

describe('FormEditControlsComponent', () => {
  let component: FormEditControlsComponent;
  let fixture: ComponentFixture<FormEditControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
