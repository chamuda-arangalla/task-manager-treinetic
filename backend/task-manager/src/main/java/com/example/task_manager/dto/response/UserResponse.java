package com.example.task_manager.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private String id;
    private String username;
    private String password;
}
