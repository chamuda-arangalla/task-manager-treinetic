package com.example.task_manager.service;

import com.example.task_manager.dto.request.TaskRequest;
import com.example.task_manager.dto.response.TaskResponse;
import com.example.task_manager.exception.NotFoundException;

import java.util.List;

public interface TaskService {

    List<TaskResponse> getAllTasks();
    TaskResponse getTaskById(String id) throws NotFoundException;
    TaskResponse createTask(TaskRequest request);
    TaskResponse updateTask(String id, TaskRequest request) throws NotFoundException;
    void deleteTask(String id) throws NotFoundException;
}
