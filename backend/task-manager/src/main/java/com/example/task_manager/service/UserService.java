package com.example.task_manager.service;

import com.example.task_manager.dto.request.LoginRequest;
import com.example.task_manager.dto.request.UserRequest;
import com.example.task_manager.dto.response.LoginResponse;
import com.example.task_manager.dto.response.UserResponse;
import com.example.task_manager.exception.AllReadyExistsException;
import com.example.task_manager.exception.NotFoundException;

public interface UserService {
    UserResponse registerUser(UserRequest userRequest) throws AllReadyExistsException;
    LoginResponse loginUser(LoginRequest loginRequest) throws NotFoundException;
}
