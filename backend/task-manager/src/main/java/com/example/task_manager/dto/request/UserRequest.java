package com.example.task_manager.dto.request;

import lombok.Data;

@Data
public class UserRequest {

    private String id;
    private String name;
    private String email;
    private String password;
    private String username;
    private String imgUrl;
}
