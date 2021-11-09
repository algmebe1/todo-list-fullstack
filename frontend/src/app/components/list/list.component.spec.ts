import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ListComponent } from './list.component';
import { TaskService } from 'src/app/services/task.service';
import { ToDoItem } from 'src/app/taskmodel';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [TaskService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    taskService = TestBed.inject(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTasks method without issues', () => {
    const response: ToDoItem[] = [];
    spyOn(taskService, 'getTasks').and.returnValue(of(response));

    component.getTasks();

    fixture.detectChanges();

    expect(component.todoList).toEqual(response);
  });

  it('should call deleteTask method without issues', () => {
    component.todoList = [{ id: 1, name: 'hello-world', status: false }];
    const taskId = 1;

    spyOn(taskService, 'deleteTask').and.returnValue(of('Deleted'));

    component.deleteTask(taskId);

    fixture.detectChanges();

    expect(component.todoList.length).toBe(0);
  });

  it('should not delete task from list if there are issues during deleteTask execution', () => {
    component.todoList = [{ id: 1, name: 'hello-world', status: false }];
    const taskId = 2;

    spyOn(taskService, 'deleteTask').and.returnValue(of('An error occurred'));

    component.deleteTask(taskId);

    fixture.detectChanges();

    expect(component.todoList.length).toBe(1);
  });

  it('should call completeTask method without issues', () => {
    component.todoList = [{ id: 1, name: 'hello-world', status: false }];
    const taskId = 1;

    const taskServiceSpy = spyOn(
      taskService,
      'updateTaskStatus'
    ).and.returnValue(of('Updated'));

    component.completeTask(taskId);

    expect(taskServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should call completeTask method without issues; else branch', () => {
    component.todoList = [{ id: 1, name: 'hello-world', status: false }];
    const taskId = 1;

    spyOn(taskService, 'updateTaskStatus').and.returnValue(
      of('An error occurred')
    );

    component.completeTask(taskId);

    fixture.detectChanges();

    expect(component.todoList[0].status).toBe(false);
  });

  it('should call clearList method without issues', () => {
    component.todoList = [
      { id: 1, name: 'hello-world', status: false },
      { id: 2, name: 'test', status: false },
    ];

    spyOn(taskService, 'clearList').and.returnValue(of('List is empty'));

    component.clearList();

    expect(component.todoList.length).toBe(0);
  });

  it('should call clearList method without issues; else branch', () => {
    component.todoList = [
      { id: 1, name: 'hello-world', status: false },
      { id: 2, name: 'test', status: false },
    ];

    const taskServiceSpy = spyOn(taskService, 'clearList').and.returnValue(
      of('An error occurred')
    );

    component.clearList();

    expect(taskServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should call uncheckTask method without issues', () => {
    component.todoList = [{ id: 1, name: 'hello-world', status: true }];
    const taskId = 1;

    const taskServiceSpy = spyOn(
      taskService,
      'updateTaskStatus'
    ).and.returnValue(of('Updated'));

    component.uncheckTask(taskId);

    fixture.detectChanges();

    expect(taskServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should call uncheckTask method without issues; else branch', () => {
    component.todoList = [{ id: 1, name: 'hello-world', status: true }];
    const taskId = 2;

    const taskServiceSpy = spyOn(
      taskService,
      'updateTaskStatus'
    ).and.returnValue(of('An error occurred'));

    component.uncheckTask(taskId);

    fixture.detectChanges();

    expect(taskServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should call updateTaskName method without issues', () => {
    component.todoList = [{ id: 1, name: 'hello-world', status: false }];
    const taskId = 1;
    const taskName = 'sleep';

    const taskServiceSpy = spyOn(taskService, 'updateTaskName').and.returnValue(
      of('Updated')
    );

    component.updateTaskName(taskId, taskName);

    fixture.detectChanges();

    expect(taskServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should call updateTaskName method without issues; else branch', () => {
    component.todoList = [{ id: 1, name: 'hello-world', status: true }];
    const taskId = 2;
    const taskName = 'sleep';

    const taskServiceSpy = spyOn(taskService, 'updateTaskName').and.returnValue(
      of('An error occurred')
    );

    component.updateTaskName(taskId, taskName);

    fixture.detectChanges();

    expect(taskServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should call openDialog', () => {
    const spyFn = spyOn(component, 'openDialog').and.callThrough();

    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<typeof component>);

    component.todoList = [{ id: 1, name: 'hello-world', status: false }];

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('span')).nativeElement;
    button.click();

    expect(spyFn).toHaveBeenCalledTimes(1);
  });

  it('should call openDialog; else branch', () => {
    const spyFn = spyOn(component, 'openDialog').and.callThrough();

    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('hello-world'),
    } as MatDialogRef<typeof component>);

    component.todoList = [{ id: 1, name: 'hello-world', status: false }];

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('span')).nativeElement;
    button.click();

    expect(spyFn).toHaveBeenCalledTimes(1);
  });
});
