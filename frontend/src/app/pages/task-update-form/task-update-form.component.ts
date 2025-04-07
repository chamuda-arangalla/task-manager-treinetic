import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';  // <-- Import this
import { TaskService } from '../../services/task.service';
import { TaskUpdate } from '../../models/taskUpdate.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-update-form',
  standalone: true, // if you're using standalone components
  imports: [CommonModule, ReactiveFormsModule,RouterLink], // <-- Add ReactiveFormsModule here
  templateUrl: './task-update-form.component.html',
  styleUrl: './task-update-form.component.css'
})
export class TasktaskEditComponent implements OnInit {

  taskEdit!: FormGroup;
  taskId?: string;

  selectedStatusLabel: string = 'To Do'; // default display
  taskStatus: string = 'TO_DO';

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router,private route: ActivatedRoute) {
    this.taskEdit = this.fb.group({
      title: [''],
      description: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.taskId = String(this.route.snapshot.paramMap.get('id'));
    if (this.taskId) {
      this.loadTaskData(this.taskId);
    }
  }

  async loadTaskData(taskId: string) {
    try {
      const task = await this.taskService.getTaskById(taskId);
      this.taskEdit.patchValue({
        title: task.title,
        description: task.description,
        status: task.status
      });
      this.selectedStatusLabel = this.getLabel(task.status);
    } catch (error) {
      console.log('Error loading task data:', error);
    }
  }
  

  async updateTask() {
    if (this.taskEdit.valid && this.taskId) {
      const updatedTask: TaskUpdate = this.taskEdit.value;
      try {
        const data = await this.taskService.updateTask(this.taskId, updatedTask);
        console.log('Task updated successfully:', data);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.log('Error updating task by ID:', error);
      }
    }
  } 

  //status drop down values
  selectStatus(status: string) {
    this.selectedStatusLabel = this.getLabel(status);
    this.taskEdit.patchValue({ status });
  }

  getLabel(status: string): string {
    switch (status) {
      case 'TO_DO': return 'To Do';
      case 'IN_PROGRESS': return 'In Progress';
      case 'DONE': return 'Done';
      default: return 'Select status';
    }
  }
}
