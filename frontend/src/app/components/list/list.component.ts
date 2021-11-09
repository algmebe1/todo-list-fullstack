import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { ToDoItem } from 'src/app/taskmodel';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

const DELETED_FEEDBACK = 'Deleted';
const UPDATED_FEEDBACK = 'Updated';
const CLEAR_LIST_FEEDBACK = 'List is empty';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  todoList: ToDoItem[] = [];

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((list) => {
      this.taskService.sendTaskToList(list);
      this.todoList = this.taskService.todoList;
    });
  }

  deleteTask(taskId: any): void {
    this.taskService.deleteTask(taskId).subscribe((s) => {
      if (s === DELETED_FEEDBACK) {
        this.taskService.deleteTaskFromList(taskId);
        this.todoList = this.taskService.todoList;
      }
    });
  }

  completeTask(taskId: any): void {
    this.taskService.updateTaskStatus(taskId).subscribe((s) => {
      if (s === UPDATED_FEEDBACK) {
        this.taskService.updateTaskFromList(taskId);
      }
    });
  }

  clearList(): void {
    this.taskService.clearList().subscribe((s) => {
      if (s === CLEAR_LIST_FEEDBACK) {
        this.taskService.emptyList();
      }
      this.todoList = this.taskService.todoList;
    });
  }

  uncheckTask(taskId: any): void {
    this.taskService.updateTaskStatus(taskId).subscribe((s) => {
      if (s === UPDATED_FEEDBACK) {
        this.taskService.updateTaskFromList(taskId);
      }
    });
  }

  updateTaskName(taskId: number, taskName: string): void {
    this.taskService.updateTaskName(taskId, taskName).subscribe((s) => {
      if (s === UPDATED_FEEDBACK) {
        this.taskService.updateNameFromList(taskId, taskName);
      }
    });
  }

  openDialog(taskId: any): void {
    const myIndex = this.todoList.findIndex((t) => t.id === taskId);
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      height: '260px',
      width: '260px',
      autoFocus: true,
      data: {
        name: this.todoList[myIndex].name,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== this.todoList[myIndex].name || result !== '') {
        this.updateTaskName(taskId, result);
      }
    });
  }
}
