package com.example.task_manager.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
public class TaskRequest {

    private String title;
    private String description;
    private String status;
}
