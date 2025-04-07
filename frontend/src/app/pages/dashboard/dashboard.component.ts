import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  
  badgeHover = false;

  constructor(private taskService: TaskService,private authService: AuthService,
    private router: Router,){}

//logout
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  tasks: any[] = [];

  async getAllItems(){
    try {
      this.tasks = await this.taskService.getAllTasks();
      console.log('Fetched tasks:', this.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
   }

  async deleteTask(id:String){
    try {
      const response = await this.taskService.deleteTask(id);
          this.tasks = this.tasks.filter(task => task.id !== id);
          alert("Task deleted Successfully!!")
          console.log("delted task",response.data)
    } catch (error) {
      console.error('Error Deleting tasks:', error);
      alert("Task delete error")
    }
  }
  


  ngOnInit(): void {
    this.getAllItems()
  }

}
