package com.example.task_manager.dto.request;

import lombok.Data;

@Data
public class UserRequest {

    private String id;
    private String username;
    private String password;
}
