import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.initializeForm();
  }

  ngOnInit(): void {}

  private initializeForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['TO_DO', Validators.required]
    });
  }

  async addTask(): Promise<void> {
    if (this.taskForm.invalid) return;

    const task: Task = this.taskForm.value;

    try {
      await this.taskService.createTask(task);
      alert('Task added successfully');
      this.taskForm.reset();
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task');
    }
  }

  //status dropdown
  selectedStatusLabel: string = 'To Do'; // default display
taskStatus: string = 'TO_DO';            // default value

selectStatus(value: string) {
  this.taskStatus = value;

  // Update label
  if (value === 'TO_DO') this.selectedStatusLabel = 'To Do';
  if (value === 'IN_PROGRESS') this.selectedStatusLabel = 'In Progress';
  if (value === 'DONE') this.selectedStatusLabel = 'Done';

  // Update form control
  this.taskForm.get('status')?.setValue(value);
}

  
}
