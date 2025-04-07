import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-update-form',
  imports: [ CommonModule],
  templateUrl: './task-update-form.component.html',
  styleUrl: './task-update-form.component.css'
})
export class TaskUpdateFormComponent implements OnInit{

    // taskEdit!: FormGroup;
  
    // constructor(private fb: FormBuilder, private taskService: TaskService) {
    //   this.initializeForm();
    // }
//   async updateTask() {
//     if (this.updateForm.valid && this.itemId) {
//       const updatedItem: updateRequest = this.updateForm.value;
//       try {
//         const data = await this.itemService.updateItemById(this.itemId, updatedItem);
//         console.log('task updated successfully:', data);
//         this.router.navigate(['/dashboard']);
//       } catch (error) {
//         console.log('Error updating task by ID:', error);
//       }
//     }
//   }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
