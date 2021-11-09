import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { FormComponent } from './form.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let fakeTaskService: TaskService;

  const taskMock = '{"id":1,"name":"hello-world","status":false}';

  beforeEach(async () => {
    fakeTaskService = jasmine.createSpyObj<TaskService>('TaskService', {
      createTask: of(taskMock),
      addTaskToList: undefined,
    });
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: TaskService, useValue: fakeTaskService },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should call onSubmit method when click',
    waitForAsync(() => {
      component.createTaskForm.controls['name'].setValue('hello-world');
      const spyFn = spyOn(component, 'onSubmit').and.callThrough();
      const compiled = fixture.nativeElement;
      const button = compiled.querySelector('button');
      button.click();

      expect(spyFn).toHaveBeenCalled();
    })
  );
});
