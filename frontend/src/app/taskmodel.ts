export interface ToDoItem {
  id?: number | undefined;
  name: string;
  status: boolean;
}

export class TaskItem implements ToDoItem {
  id?: number | undefined;
  name!: string;
  status!: boolean;
}
