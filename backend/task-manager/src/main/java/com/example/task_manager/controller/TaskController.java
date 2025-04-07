package com.example.task_manager.controller;

import com.example.task_manager.dto.request.TaskRequest;
import com.example.task_manager.dto.response.TaskResponse;
import com.example.task_manager.exception.NotFoundException;
import com.example.task_manager.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@AllArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<TaskResponse> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public TaskResponse getTaskById(@PathVariable String id) throws NotFoundException {
        return taskService.getTaskById(id);
    }

    @PostMapping
    public TaskResponse createTask(@Valid @RequestBody TaskRequest request) {
        return taskService.createTask(request);
    }

    @PutMapping("/{id}")
    public TaskResponse updateTask(@PathVariable String id, @Valid @RequestBody TaskRequest request) throws NotFoundException {
        return taskService.updateTask(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) throws NotFoundException {
        taskService.deleteTask(id);
    }
}
