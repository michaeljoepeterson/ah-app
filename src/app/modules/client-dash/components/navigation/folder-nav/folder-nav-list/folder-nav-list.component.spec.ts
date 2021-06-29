import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderNavListComponent } from './folder-nav-list.component';

describe('FolderNavListComponent', () => {
  let component: FolderNavListComponent;
  let fixture: ComponentFixture<FolderNavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderNavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
