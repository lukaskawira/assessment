import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventDialogComponent } from './subevent-dialog.component';

describe('SubeventDialogComponent', () => {
  let component: SubeventDialogComponent;
  let fixture: ComponentFixture<SubeventDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubeventDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubeventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
