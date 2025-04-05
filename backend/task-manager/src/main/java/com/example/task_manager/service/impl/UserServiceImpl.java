package com.example.task_manager.service.impl;

import com.example.task_manager.dto.request.LoginRequest;
import com.example.task_manager.dto.request.UserRequest;
import com.example.task_manager.dto.response.LoginResponse;
import com.example.task_manager.dto.response.UserResponse;
import com.example.task_manager.exception.AllReadyExistsException;
import com.example.task_manager.exception.NotFoundException;
import com.example.task_manager.model.User;
import com.example.task_manager.repository.UserRepository;
import com.example.task_manager.service.UserService;
import com.example.task_manager.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    public UserResponse registerUser(UserRequest userRequest) throws AllReadyExistsException {
        User user = new User();
        user.setName(userRequest.getName());
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));

        User existsUser = userRepository.findByUsername(userRequest.getUsername());

        if(existsUser != null){
            throw new AllReadyExistsException("User already exists with username: " + userRequest.getUsername());
        }

        user.setUsername(userRequest.getUsername());

        userRepository.save(user);

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .username(user.getUsername())
                .build();
    }

    @Override
    public LoginResponse loginUser(LoginRequest loginRequest) throws NotFoundException {
        return null;
    }
}
