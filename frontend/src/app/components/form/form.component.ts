import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ToDoItem } from '../../taskmodel';
import { TaskService } from 'src/app/services/task.service';

/* const SUCCESS_FEEDBACK = 'Saved'; */

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  createTaskForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    const taskObject: ToDoItem = {
      name: this.createTaskForm.get('name')!.value,
      status: false,
    };
    this.taskService.createTask(taskObject).subscribe((s) => {
      this.taskService.addTaskToList(JSON.parse(s));
    });

    this.createTaskForm.reset();
  }
}
