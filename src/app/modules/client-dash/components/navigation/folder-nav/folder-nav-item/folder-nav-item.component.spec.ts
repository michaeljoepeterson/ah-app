import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderNavItemComponent } from './folder-nav-item.component';

describe('FolderNavItemComponent', () => {
  let component: FolderNavItemComponent;
  let fixture: ComponentFixture<FolderNavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderNavItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
