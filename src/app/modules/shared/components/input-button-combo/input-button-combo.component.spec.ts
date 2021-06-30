import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputButtonComboComponent } from './input-button-combo.component';

describe('InputButtonComboComponent', () => {
  let component: InputButtonComboComponent;
  let fixture: ComponentFixture<InputButtonComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputButtonComboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputButtonComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
