import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { TaskService } from './task.service';
import { ToDoItem } from '../taskmodel';

describe('TaskService', () => {
  let service: TaskService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TaskService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('getTasks method', () => {
    const taskList: ToDoItem[] = [
      { id: 1, name: 'A', status: false },
      { id: 2, name: 'B', status: true },
    ];

    const getUrl: string = 'http://localhost:8080/tasks/list';

    service.getTasks().subscribe((data) => expect(data).toEqual(taskList));

    const req = httpTestingController.expectOne(getUrl);

    expect(req.request.method).toEqual('GET');

    req.flush(taskList);

    httpTestingController.verify();
  });

  it('createTask method', () => {
    const task: ToDoItem = { id: 1, name: 'A', status: false };

    const getUrl: string = 'http://localhost:8080/tasks/createTask';

    service
      .createTask(task)
      .subscribe((data) => expect(JSON.parse(data)).toEqual(task));

    const req = httpTestingController.expectOne(getUrl);

    expect(req.request.method).toEqual('POST');

    req.flush(task);

    httpTestingController.verify();
  });

  it('addTaskToList method', () => {
    const task: ToDoItem = { id: 1, name: 'A', status: false };

    service.addTaskToList(task);

    expect(service.todoList.length).toBe(1);
    expect(service.todoList[0]).toEqual(task);
  });

  it('sendTaskToList method', () => {
    const taskList: ToDoItem[] = [
      { id: 1, name: 'A', status: false },
      { id: 2, name: 'B', status: true },
    ];

    service.sendTaskToList(taskList);

    expect(service.todoList).toEqual(taskList);
  });

  it('deleteTask method', () => {
    const taskId: number = 1;

    const deleteUrl: string = `http://localhost:8080/tasks/deleteTask/${taskId}`;

    service
      .deleteTask(taskId)
      .subscribe((data) => expect(data).toBe('Deleted'));

    const req = httpTestingController.expectOne(deleteUrl);

    expect(req.request.method).toEqual('DELETE');

    req.flush('Deleted');

    httpTestingController.verify();
  });

  it('deleteTaskFromList method', () => {
    service.todoList = [{ id: 1, name: 'A', status: false }];
    const taskId: number = 1;

    service.deleteTaskFromList(taskId);

    expect(service.todoList.length).toBe(0);
  });

  it('updateTaskStatus method', () => {
    const taskId: number = 1;

    const updateUrl: string = `http://localhost:8080/tasks/updateTask/${taskId}`;

    service
      .updateTaskStatus(taskId)
      .subscribe((data) => expect(data).toBe('Updated'));

    const req = httpTestingController.expectOne(updateUrl);

    expect(req.request.method).toEqual('PUT');

    req.flush('Updated');

    httpTestingController.verify();
  });

  it('updateTaskFromList method', () => {
    service.todoList = [{ id: 1, name: 'A', status: false }];
    const taskId: number = 1;

    service.updateTaskFromList(taskId);

    expect(service.todoList[0]).toEqual({ id: 1, name: 'A', status: true });
  });

  it('clearList method', () => {
    const deleteUrl: string = 'http://localhost:8080/tasks/deleteAll';

    service.clearList().subscribe((data) => expect(data).toBe('List is empty'));

    const req = httpTestingController.expectOne(deleteUrl);

    expect(req.request.method).toEqual('DELETE');

    req.flush('List is empty');

    httpTestingController.verify();
  });

  it('emptyList method', () => {
    service.todoList = [
      { id: 1, name: 'A', status: false },
      { id: 2, name: 'B', status: true },
    ];

    service.emptyList();

    expect(service.todoList.length).toBe(0);
  });

  it('updateTaskName method', () => {
    const taskId: number = 1;
    const taskName: string = 'sleep';
    const updateTaskNameUrl = `http://localhost:8080/tasks/updateTaskName/${taskId}`;

    service
      .updateTaskName(taskId, taskName)
      .subscribe((data) => expect(data).toBe('Updated'));

    const req = httpTestingController.expectOne(updateTaskNameUrl);

    expect(req.request.method).toEqual('PUT');

    req.flush('Updated');

    httpTestingController.verify();
  });

  it('updateNameFromList method', () => {
    service.todoList = [
      { id: 1, name: 'A', status: false },
      { id: 2, name: 'B', status: true },
    ];
    const taskId: number = 1;
    const taskName: string = 'sleep';

    service.updateNameFromList(taskId, taskName);

    expect(service.todoList[0]).toEqual({
      id: 1,
      name: 'sleep',
      status: false,
    });
  });
});
