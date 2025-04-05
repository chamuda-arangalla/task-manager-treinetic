package com.example.task_manager.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private String id;
    private String name;
    private String email;
    private String username;
    private String token;
}
