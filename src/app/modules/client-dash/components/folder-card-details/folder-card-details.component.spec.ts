import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderCardDetailsComponent } from './folder-card-details.component';

describe('FolderCardDetailsComponent', () => {
  let component: FolderCardDetailsComponent;
  let fixture: ComponentFixture<FolderCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderCardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
