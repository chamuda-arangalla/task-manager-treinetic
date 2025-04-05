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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
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
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));

        User existsUser = userRepository.findByUsername(userRequest.getUsername());

        if(existsUser != null){
            throw new AllReadyExistsException("User already exists with username: " + userRequest.getUsername());
        }

        user.setUsername(userRequest.getUsername());

        userRepository.save(user);

        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }

    @Override
    public LoginResponse loginUser(LoginRequest loginRequest) throws NotFoundException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String jwt = jwtUtil.generateToken(userDetails);

        User foundUser = userRepository.findByUsername(loginRequest.getUsername());

        if (foundUser == null){
            throw new NotFoundException("User not found with username: " + loginRequest.getUsername());
        }

        return LoginResponse.builder()
                .id(foundUser.getId())
                .username(foundUser.getUsername())
                .token(jwt)
                .build();
    }
}
