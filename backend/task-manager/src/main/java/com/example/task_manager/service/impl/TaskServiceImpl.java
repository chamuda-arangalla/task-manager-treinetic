package com.example.task_manager.service.impl;

import com.example.task_manager.dto.request.TaskRequest;
import com.example.task_manager.dto.response.TaskResponse;
import com.example.task_manager.exception.NotFoundException;
import com.example.task_manager.model.Task;
import com.example.task_manager.repository.TaskRepository;
import com.example.task_manager.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(task -> new TaskResponse(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getStatus(),
                        task.getCreatedAt().toString()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponse getTaskById(String id) throws NotFoundException {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Task not found with id: " + id));

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreatedAt().toString()
        );
    }

    @Override
    public TaskResponse createTask(TaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus() != null ? request.getStatus() : "TO_DO");
        task.setCreatedAt(LocalDateTime.now());

        Task saved = taskRepository.save(task);

        return new TaskResponse(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getStatus(),
                saved.getCreatedAt().toString()
        );
    }

    @Override
    public TaskResponse updateTask(String id, TaskRequest request) throws NotFoundException {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Task not found with id: " + id));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());

        Task updated = taskRepository.save(task);

        return new TaskResponse(
                updated.getId(),
                updated.getTitle(),
                updated.getDescription(),
                updated.getStatus(),
                updated.getCreatedAt().toString()
        );
    }

    @Override
    public void deleteTask(String id) throws NotFoundException {
        if (!taskRepository.existsById(id)) {
            throw new NotFoundException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }


}
