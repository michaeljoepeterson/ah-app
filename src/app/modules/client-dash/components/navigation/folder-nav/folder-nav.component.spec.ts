import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderNavComponent } from './folder-nav.component';

describe('FolderNavComponent', () => {
  let component: FolderNavComponent;
  let fixture: ComponentFixture<FolderNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
