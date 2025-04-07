package com.example.task_manager.controller;

import com.example.task_manager.dto.request.LoginRequest;
import com.example.task_manager.dto.request.UserRequest;
import com.example.task_manager.dto.response.LoginResponse;
import com.example.task_manager.dto.response.UserResponse;
import com.example.task_manager.exception.AllReadyExistsException;
import com.example.task_manager.exception.NotFoundException;
import com.example.task_manager.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public UserResponse register(@RequestBody UserRequest userRequest) throws AllReadyExistsException {
        return userService.registerUser(userRequest);
    }

    @PostMapping("/login")
    public LoginResponse loginResponse(@RequestBody LoginRequest loginRequest) throws NotFoundException {
        return userService.loginUser(loginRequest);
    }
}
