import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedDialogComponent } from './failed-dialog.component';

describe('FailedDialogComponent', () => {
  let component: FailedDialogComponent;
  let fixture: ComponentFixture<FailedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
