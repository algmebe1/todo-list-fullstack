import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskItem } from 'src/app/taskmodel';

import { TaskDialogComponent } from './task-dialog.component';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;
  const dialogMock = {
    close: () => {},
  };

  const data = new TaskItem();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('it should call onNoClick method', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();

    component.onNoClick();
    expect(spy).toHaveBeenCalled();
  });
});
