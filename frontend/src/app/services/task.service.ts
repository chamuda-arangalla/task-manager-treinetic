import { Injectable } from '@angular/core';
import axios from 'axios';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API_URL = 'http://localhost:8085/api/v1';

  constructor() {}
//Add task
  async createTask(task: Task): Promise<any> {
    const taskRequest = {
      title: task.title,
      description: task.description,
      status: task.status
    };

    try {
      const response = await axios.post(`${this.API_URL}/tasks`, taskRequest);
      return response.data;
    } catch (error) {
      console.error('Error while creating task:', error);
      throw error;
    }
  }

  //get all tasks
  async getAllTasks(){

    try {

      const response = await axios.get(`${this.API_URL}/tasks`)
      return  response.data;
      
    } catch (error) {
      
      console.log('Error while getting tasks:',error);
    }
  }

  //delete a task
  async deleteTask(id:String){
    try {
      
      const response = await axios.delete(`${this.API_URL}/tasks/${id}`)
      return response.data;

    } catch (error) {
      console.log('Error while deleting a task:',error);
    }
  }
}
