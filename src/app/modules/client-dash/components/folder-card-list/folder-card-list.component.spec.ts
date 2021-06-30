import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderCardListComponent } from './folder-card-list.component';

describe('FolderCardListComponent', () => {
  let component: FolderCardListComponent;
  let fixture: ComponentFixture<FolderCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
