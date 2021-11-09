import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ToDoItem } from '../taskmodel';

const getUrl: string = 'http://localhost:8080/tasks/list';
const postUrl: string = 'http://localhost:8080/tasks/createTask';
const deleteAllUrl: string = 'http://localhost:8080/tasks/deleteAll';

let HttpOptions: Object = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  responseType: 'text',
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  todoList: ToDoItem[] = [];

  constructor(private http: HttpClient) {}

  // GET
  getTasks(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(getUrl);
  }

  // POST
  // at DB...
  createTask(taskObject: ToDoItem): Observable<any> {
    return this.http.post<any>(postUrl, taskObject, HttpOptions);
  }

  // at local...
  addTaskToList(taskObject: ToDoItem): void {
    this.todoList.push(taskObject);
  }

  // UPDATE todoList local variable
  sendTaskToList(list: ToDoItem[]): void {
    this.todoList = list;
  }

  // DELETE
  // at DB...
  deleteTask(taskId: number): Observable<any> {
    const deleteUrl = `http://localhost:8080/tasks/deleteTask/${taskId}`;
    return this.http.delete<any>(deleteUrl, HttpOptions);
  }

  // at local...
  deleteTaskFromList(taskId: number): void {
    this.todoList = this.todoList.filter((t) => t.id !== taskId);
  }

  // UPDATE
  // at DB...
  updateTaskStatus(taskId: number): Observable<any> {
    const updateUrl = `http://localhost:8080/tasks/updateTask/${taskId}`;
    return this.http.put<any>(updateUrl, null, HttpOptions);
  }

  // at local...
  updateTaskFromList(taskId: number): void {
    const index = this.todoList.findIndex((t) => t.id === taskId);
    this.todoList[index].status = !this.todoList[index].status;
  }

  // CLEAR LIST
  // at DB...

  clearList(): Observable<any> {
    return this.http.delete<any>(deleteAllUrl, HttpOptions);
  }

  // at local...
  emptyList(): void {
    this.todoList = [];
  }

  // UPDATE TASK NAME
  // at DB...
  updateTaskName(taskId: number, taskName: string): Observable<any> {
    const updateTaskNameUrl = `http://localhost:8080/tasks/updateTaskName/${taskId}`;
    return this.http.put<any>(updateTaskNameUrl, taskName, HttpOptions);
  }

  // at local...
  updateNameFromList(taskId: number, taskName: string): void {
    const myIndex = this.todoList.findIndex((t) => t.id === taskId);
    this.todoList[myIndex].name = taskName;
  }
}
